const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videos: {
    type: Array,
    required: true,
    default: void 0
  },
  URL: {
    type: String,
    required: true
  }
});

const Playlist = module.exports = mongoose.model("Playlist", playlistSchema);