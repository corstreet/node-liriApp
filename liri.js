//Requirements
require("dotenv").config();
var axios = require("axios");

var Spotify = require("node-spotify-api");

//bring in spotify creds and initialize
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//store song as string
var songToSearch = process.argv[2];

//create an initial POC that can search spotify just by providing the song arg
spotify.search({ type:'track', query: songToSearch }, function(err, res){
  if (err) {
    return console.log('The following error occurred while search spotify: ' + err);
  }
  // console.log(res.tracks.items[0]);
  var tracks = res.tracks.items;
  //get each track
  tracks.map(track => {
    //store Artist, Song Name, preview link url, album name
    var artist = track.artists[0].name;
    var songName = track.name;
    var previewLinkURL = track.preview_url;
    var albumName = track.album.name;
    //print matching track information to console
    console.log(
      "\nArtist Name: " + artist,
      "\nSong Name: " + songName,
      "\nAlbum Name: " + albumName,
      "\nSpotify Preview Link: " + previewLinkURL,
      track.explicit===true ? "\nThis is an EXPLICIT track. Get your mommy\n" : "\n",
      "\n---------------------------------\n",
      )
  })
});
