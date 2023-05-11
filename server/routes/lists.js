const express = require("express");
const List = require("../models/list");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const verifyUser = require("../utils/middleware");
const router = express.Router();

//Create new Movie
router.post(
  "/",
  verifyUser,
  wrapAsync(async (req, res) => {
    if (req.user.Admin) {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.json(savedList);
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not add Lists",
        403
      );
    }
  })
);

//Delete list
router.delete(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.Admin) {
      await List.findByIdAndDelete(id);
      res.json("Deleted Successfully");
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not delete lists",
        403
      );
    }
  })
);

//Get 10 lists
router.get(
  "/",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { genre, type } = req.query;
    let list = [];
    if (type) {
      if (genre) {
        list = await List.aggregate([
          { $match: { type: type, genre: genre } },
          { $sample: { size: 10 } },
        ]);
      } else {
        list = await List.aggregate([
          { $match: { type: type } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    list = await List.populate(list, { path: "content" });
    res.json(list);
  })
);

//Get list by Id
router.get(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const searchedList = await List.findById(id).populate("content");
    res.json(searchedList);
  })
);

//Update List
router.put(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.Admin) {
      const updatedList = await List.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedList);
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not update Lists",
        403
      );
    }
  })
);

module.exports = router;
