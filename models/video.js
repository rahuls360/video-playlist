const mongoose = require("mongoose");

let videoSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  url: String,
  duration: String
});

let Video = module.exports = mongoose.model("Video", videoSchema);