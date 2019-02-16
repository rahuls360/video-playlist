const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//setup dotenv package
dotenv.config();

const Video = require("./models/video");

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

//Start Server
app.listen(3000, () => {
  console.log("Server is running");
});