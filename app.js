const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
  console.log(process.env);
  res.send("Working!");
});

//Read All Videos
app.get("/videos", (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      console.log(err.message);
      res.send({ error: err.message });
    } else {
      res.json(videos);
    }
  });
});

//Read Single Video
app.get("/video/:id", (req, res) => {
  let id = req.params.id;
  Video.findById(id, (err, video) => {
    if (err) {
      console.log(err.message);
      res.send({ error: "Video id not found" });
    } else {
      res.json(video);
    }
  });
});

//Create Video
app.post("/video/new", (req, res) => {
  let video = req.body;

  Video.create(
    {
      title: video.title,
      thumbnail: video.thumbnail,
      url: video.url,
      duration: video.duration
    },
    function(err, createdVideo) {
      if (err) {
        console.log(err.message);
        res.send({ error: err.message });
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
  Video.deleteOne(
    {
      _id: id
    },
    err => {
      if (err) {
        console.log(err.message);
        res.send({ error: err.message });
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
      console.log(err.message);
      res.send({ error: err.message });
    } else {
      res.json(playlists);
    }
  });
});

//Read Single playlist
app.get("/playlist/:id", (req, res) => {
  let id = req.params.id;
  Playlist.findById(id, (err, playlist) => {
    if (err) {
      console.log(err.message);
      res.send({ error: "Playlist id not found" });
    } else {
      res.json(playlist);
    }
  });
});

//Create Playlist
app.post("/playlist/new", (req, res) => {
  let playlist = req.body;

  Playlist.create(
    {
      title: playlist.title,
      videos: playlist.videos,
      URL: playlist.URL
    },
    function(err, createdPlaylist) {
      if (err) {
        console.log(err.message);
        res.send({ error: err.message });
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
  Playlist.deleteOne(
    {
      _id: id
    },
    err => {
      if (err) {
        console.log(err.message);
        res.send({ error: err.message });
      } else {
        console.log("Delete Successful");
        res.send("Playlist Deleted");
      }
    }
  );
});

//Shuffle Playlist
app.get("/shuffle/:id", (req, res) => {
  let id = req.params.id;
  Playlist.findById(id, (err, playlist) => {
    if (err) {
      console.log(err.message);
      res.send({ error: "Playlist id not found" });
    } else {
      res.send(shuffleArray(playlist.videos));
    }
  });
});

// Using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//Shuffle Videos Array
// shuffleArray(videos);

//Start Server
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
