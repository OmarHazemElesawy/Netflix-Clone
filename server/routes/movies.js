const express = require("express");
const Movie = require("../models/movie");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const verifyUser = require("../utils/middleware");
const router = express.Router();

// //Get all movies
router.get(
  "/",
  verifyUser,
  wrapAsync(async (req, res) => {
    if (req.user.Admin) {
      const movies = await Movie.find({});
      res.json(movies.reverse());
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not get all movies or series",
        403
      );
    }
  })
);

//Get random movie
router.get(
  "/random",
  verifyUser,
  wrapAsync(async (req, res) => {
      const { type } = req.query;
      let randSample;
      if (type === "series") {
        randSample = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else if (type === "movies") {
        randSample = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      } else {
        randSample = await Movie.aggregate([
        { $sample: { size: 1 } },
      ]);
      }
      res.json(randSample);
  })
);

//Get movie by Id
router.get(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const searchedMovie = await Movie.findById(id);
    res.json(searchedMovie);
  })
);

//create new Movie
router.post(
  "/",
  verifyUser,
  wrapAsync(async (req, res) => {
    if (req.user.Admin) {
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      res.json(savedMovie);
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not add movies or series",
        403
      );
    }
  })
);

//Update Movie
router.put(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.Admin) {
      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedMovie);
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not update movies or series",
        403
      );
    }
  })
);

//Delete Movie
router.delete(
  "/:id",
  verifyUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.Admin) {
      await Movie.findByIdAndDelete(id);
      res.json("Deleted Successfully!");
    } else {
      throw new ExpressError(
        "You Are not an Admin, you can not delete movies or series",
        403
      );
    }
  })
);

module.exports = router;
