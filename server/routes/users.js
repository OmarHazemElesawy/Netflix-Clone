const express = require("express");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const verifyUser = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Get all users
router.get(
  "/",
  verifyUser,
  wrapAsync(async (req, res) => {
    const query = req.query.new;
    if (req.user.Admin) {
      const users = query
        ? await User.find({}).sort({ _id: -1 }).limit(5)
        : await User.find({});
      res.json(users);
    } else {
      throw new ExpressError("You Are not allowed to get users", 401);
    }
  })
);

//get user stats
router.get(
  "/stats",
  verifyUser,
  wrapAsync(async (_req, res) => {
    const userData = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(userData);
  })
);

//Get user Id
router.get(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const searchedUser = await User.findById(id);
    if (req.user.Admin) {
      const decryptedContent = CryptoJS.AES.decrypt(
        searchedUser.password,
        process.env.ENCRYPT_KEY
      );
      const decryptedPass = decryptedContent.toString(CryptoJS.enc.Utf8);
      const { password, ...Userinfo } = searchedUser._doc;
      return res.json({...Userinfo, password: decryptedPass});
    }
    const { password, ...Userinfo } = searchedUser._doc;
    res.json(Userinfo);
  })
);

//Update
router.put(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.id === id || req.user.Admin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.ENCRYPT_KEY
        ).toString();
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      throw new ExpressError("You Are not allowed to Update this user", 403);
    }
  })
);

//Delete
router.delete(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.id === id || req.user.Admin) {
      await User.findByIdAndDelete(id);
      res.json("User Deleted Successfully");
    } else {
      throw new ExpressError("You Are not allowed to Delete this user", 403);
    }
  })
);

module.exports = router;
