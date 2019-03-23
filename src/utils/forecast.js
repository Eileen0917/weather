const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a763be4382884cea0763809b5705302c/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find place, try another search.')
        } else {
            callback(undefined, body.daily.data[0].summary + ' Here is ' + body.currently.temperature + ' degree and have ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast