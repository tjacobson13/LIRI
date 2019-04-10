require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const command = process.argv[2];
const input = process.argv[3];

const liri = () => {
  switch (command) {
    case 'concert-this':
      console.log("concert this");
      const url = `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`;
      axios.get(url)
        .then(function ({ data }) {

          const results = data.map(obj => {
            // Object Destructuring 
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

          // Sort the array by time
          results.sort((d1, d2) => {
            return new Date(d2.datetime) - new Date(d1.datetime);
          });

          // Map over and log each
          const phrases = results.map(({ name, city, datetime, hour, date }, index) => {
            console.log(`Event #${index + 1} is ${name} happening in ${city} on ${date} at ${hour}`);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      break;
    case 'spotify-this-song':
      console.log("spotify");
      .search({ type: 'track', query: 'All the Small Things' })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
      break;
    case 'movie-this':
      console.log('movie-this');
      break;
    case 6:
      console.log("do-what-it-says");
      break;
  }
};
