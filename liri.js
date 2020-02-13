//Requirements
require("dotenv").config();
var axios = require("axios");

var Spotify = require("node-spotify-api");

//bring in spotify creds and initialize
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//store song as string
var songToSearch = process.argv[2];
// searchSpotify(songToSearch);
//create an initial POC that can search spotify just by providing the song arg
spotify.search({ type:'track', query: songToSearch }, function(err, res){
  if (err) {
    return console.log('The following error occurred while search spotify: ' + err);
  }
  console.log(res.tracks.items[0].album.artists[0].name);
});
