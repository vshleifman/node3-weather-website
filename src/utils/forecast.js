const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/50e73107ecb68ed7d5dacb5a532eb115/${lat},${long}?units=si`
  
  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location servises!')
    } else if(body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, (
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`
      ))
    }
  })
}

module.exports = forecast
