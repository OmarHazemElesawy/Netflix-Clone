const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    ageLimit: {
      type: Number,
    },
    year: {
      type: String,
    },
    genre: {
      type: String,
    },
    mainImg: {
      type: String,
    },
    titleImg: {
      type: String,
    },
    listImg: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
