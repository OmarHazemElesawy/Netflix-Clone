const express = require("express");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Register
router.post(
  "/register",
  wrapAsync(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      profileImg: req.body.profileImg,
      Admin: req.body.Admin,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.ENCRYPT_KEY
      ).toString(),
    });
    const user = await newUser.save();
    res.json(user);
  })
);

//Login
router.post(
  "/login",
  wrapAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new ExpressError("user not found", 400);
    const decryptedContent = CryptoJS.AES.decrypt(
      user.password,
      process.env.ENCRYPT_KEY
    );
    const decryptedPass = decryptedContent.toString(CryptoJS.enc.Utf8);
    if (req.body.password !== decryptedPass) {
      throw new ExpressError("wrong email or password", 400);
    }
    //JWT SIGNING
    const accessToken = jwt.sign(
      { id: user._id, Admin: user.Admin },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const { password, ...info } = user._doc;
    res.json({ info, accessToken });
  })
);

module.exports = router;
