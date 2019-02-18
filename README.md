# Live Version

https://video-playlist-rahuls360.herokuapp.com

## Documentation

### Get All Videos

/videos [GET]

### Get Single Video information

/video/:id [GET]

### Create Video

/video/new [POST]

#### Pass the following Parameters

* title
* thumbnail
* url
* duration

### Delete a video

/video/:id [DELETE]

&nbsp;

### Get All Playlists

/playlists [GET]

### Get Single Playlist information

/playlist/:id [GET]

### Create Playlist

/playlist/new [POST]

#### Pass the following Parameters

* title
* videos [array]
* URL

### Delete a Playlist

/playlist/:id [DELETE]
