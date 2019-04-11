require("dotenv").config();
const fs = require("fs");
const _ = require('lodash');
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const command = process.argv[2];
const input = process.argv[3];
const log4js = require('log4js');
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'logs.txt' } },
  categories: { default: { appenders: ['logger'], level: 'info' } }
});
const logger = log4js.getLogger('logger');

const start = () => {
  switch (command) {
    case 'concert-this':
      concertThisConcert();
      break;
    case 'spotify-this-song':
      spotifyThisSong(input);
      break;
    case 'movie-this':
      movieThisMovie();
      break;
    case 'do-what-it-says':
      log("do-what-it-says");

      readFile()
        .then(data => {
          return spotifyThisSong(data);
        })
        .catch(e => {
          log(e);
        })
      break;
  }
}

const concertThisConcert = () => {
  log("concert this");
  const url = `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`;
  axios.get(url)
    .then(function ({ data }) {

      const results = data.map(obj => {
        const { venue: { name, city, region }, datetime } = obj;
        const hour = moment(datetime).format('h:mm a');
        const date = moment(datetime).format('MM-DD-YYYY');
        return {
          name,
          city,
          datetime,
          region,
          date,
          hour
        };
      })

      results.sort((d1, d2) => {
        return new Date(d2.datetime) - new Date(d1.datetime);
      });

      const phrases = results.map(({ name, city, datetime, hour, date }, index) => {
        log(`Event #${index + 1} is happening in ${city} at ${name} on ${date} at ${hour}`);
      });
    })
    .catch(function (error) {
      log(error);
    });
}


const movieThisMovie = () => {
  log('movie-this');
  axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      log(response.data.Title);
      log(response.data.Year);
      log('imdb rating:' + response.data.Ratings[0].Value);
      log('rotten tomatoes rating:' + response.data.Ratings[1].Value);
      log(response.data.Country);
      log(response.data.Language);
      log(response.data.Plot);
      log(response.data.Actors);

    })
    .catch(function (error) {
      log(error);
    });
}

const spotifyThisSong = (songName) => {
  spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {

    if (err) {
      return log('Error occurred: ' + err);
    }

    const items = data.tracks.items;

    // 
    const maxItem = _.maxBy(items, (item) => {
      return item.popularity;
    })

    log(maxItem.name);
    log(maxItem.preview_url);
    log(maxItem.album.artists[0].name)
    log(maxItem.album.name);
  });
}

const log = (text) => {
  console.log(text);
  logger.info(text);
}


const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
      log(err, data);
      if (err) {
        reject(err);
      }
      const name = data.split(',')[1];
      resolve(name);
    });
  })
};

// start dis shit
start();
