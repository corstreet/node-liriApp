//Requirements
require("dotenv").config();
var axios = require("axios");

var Spotify = require("node-spotify-api");

//bring in spotify creds and initialize
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var OMDBkey = keys.OMDB.key;

//store song as string
var serviceRequested = process.argv[2];
var userInput = process.argv[3];

sortAndRunService(serviceRequested);

//function to decide which service we are running
function sortAndRunService(serviceRequested){
  switch (serviceRequested) {
    case "spotify-this-song": 
      //if user forgot to choose a song, we'll use 'The Sign' by Ace of Base
      userInput ? searchSpotifyForSong(userInput) : searchSpotifyForSong("The Sign");
      break;
    case "concert-this":
      console.log("concert-this");
      break;
    case "movie-this":
      searchMovie(userInput);
      break;
    case "do-what-it-says":
      console.log("do-what-it-says");
      break;
      
    default:
      console.log(
        "\nInstead of node liri, use the following commands:",
        "\nnpm run song",
        "\nnpm run movie",
        "\nnpm run concert"
      )
      break;
  }
}
//OMDB movie search function
function searchMovie(movieToSearch){
  //return results for 'Mr Nobody' if no movie entered
  if (!movieToSearch) {
    var movieToSearch = "Mr Nobody";
  }
  //build query url
  var url = `http://www.omdbapi.com/?apikey=${OMDBkey}&t=${movieToSearch}`;
  //axios
  axios.get(url)
    .then(res => {
      //store response data
      var movie = res.data;
      var title = movie.Title;
      var year = movie.Year;
      var imdbRating = movie.imdbRating;
      var rtRating = movie.Ratings[1].Value;
      var country = movie.Country;
      var language = movie.Language;
      var plot = movie.Plot;
      var actors = movie.Actors;
      //log some info about the matched movie
      console.log(
        "\nTitle: " + title,
        "\nYear: " + year,
        "\nIMDB Rating: " + imdbRating,
        "\nRotten Tomatoes Rating: " + rtRating,
        "\nFilmed In: " + country,
        "\nLanguage(s): " + language,
        "\nPlot: " + plot,
        "\nActors: " + actors,
      )
    })
    .catch(err => console.log(err))
}

//spotify-this-song search function
function searchSpotifyForSong(songToSearch){
  spotify.search({ type: 'track', query: songToSearch }, function (err, res) {
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
        track.explicit === true ? "\nThis is an EXPLICIT track. Ask your mommy\n" : "\n",
        "\n---------------------------------\n",
      )
    })
  });
}


