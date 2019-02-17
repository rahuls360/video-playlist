const mongoose = require("mongoose");

let videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

let Video = module.exports = mongoose.model("Video", videoSchema);