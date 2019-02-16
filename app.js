const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//setup dotenv package
dotenv.config();

const Video = require("./models/video");
const Playlist = require("./models/playlist");

//connect to db
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
});
var db = mongoose.connection;

//setup bodyparser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//home
app.get("/", (req, res) => {
  console.log(process.env)
  res.send("Working!");
});

//Read All Videos
app.get("/videos", (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(videos);
    }
  });
});

//Read Single Video
app.get("/video/:id", (req, res) => {
  let id = req.params.id;
  Video.find({
      _id: id
    },
    (err, video) => {
      if (err) {
        console.log(err);
      } else {
        res.json(video);
      }
    }
  );
});

//Create Video
app.post("/video/new", (req, res) => {
  let video = req.body;

  Video.create({
      title: video.title,
      thumbnail: video.thumbnail,
      url: video.url,
      duration: video.duration
    },
    function (err, createdVideo) {
      if (err) {
        console.log(err);
      } else {
        console.log("Video Added");
        res.send("Video Added");
      }
    }
  );
});

//Delete Video
app.delete("/video/:id", (req, res) => {
  let id = req.params.id;
  Video.deleteOne({
      _id: id
    },
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Delete Successful");
        res.send("Video Deleted");
      }
    }
  );
});

//Read All Playlists
app.get("/playlists", (req, res) => {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      console.log(err);
    } else {
      res.json(playlists);
    }
  });
});

//Read Single playlist
app.get("/playlist/:id", (req, res) => {
  let id = req.params.id;
  Playlist.find({
      _id: id
    },
    (err, playlist) => {
      if (err) {
        console.log(err);
      } else {
        res.json(playlist);
      }
    }
  );
});

//Create Playlist
app.post("/playlist/new", (req, res) => {
  let playlist = req.body;

  Playlist.create({
      title: playlist.title,
      videos: playlist.videos,
      URL: playlist.URL
    },
    function (err, createdPlaylist) {
      if (err) {
        console.log(err);
      } else {
        console.log("Playlist created");
        res.send("Playlist created");
      }
    }
  );
});

//Delete Playlist
app.delete("/playlist/:id", (req, res) => {
  let id = req.params.id;
  Playlist.deleteOne({
      _id: id
    },
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log("Delete Successful");
        res.send("Playlist Deleted");
      }
    }
  );
});

//Start Server
app.listen(3000, () => {
  console.log("Server is running");
});