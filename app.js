const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Video = require("./models/video");

mongoose.connect("mongodb://admin:123rahul@ds137605.mlab.com:37605/video-playlist", {
  useNewUrlParser: true
});
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
  extended: true
}));

//home
app.get("/", (req, res) => {
  res.send("Working!");
});

//Read Video
app.get("/video", (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(videos);
    }
  });
});

//Create Video
app.post("/video/new", (req, res) => {
  let video = req.body;

  Video.create({
    title: video.title,
    thumbnail: video.thumbnail,
    url: video.url,
    duration: video.duration
  }, function (err, createdVideo) {
    if (err) {
      console.log(err);
    } else {
      console.log("Video Added");
    }
  })
})

//Start Server
app.listen(3000, () => {
  console.log("Server is running");
});