const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
  title: String,
  videos: Array,
  URL: String
});

const Playlist = module.exports = mongoose.model("Playlist", playlistSchema);