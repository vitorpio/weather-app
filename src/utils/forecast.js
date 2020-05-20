const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=92f23f37e1b8a67ae8ec140421401954&query=${encodeURIComponent(
        latitude
    )},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({
                status: 500,
                message: 'Unable to connect to weather service'
            })
        } else if (body.error) {
            callback({
                status: 404,
                message: 'Could not get forecast for these coordinates.'
            })
        } else {
            const {
                weather_descriptions,
                temperature,
                feelslike
            } = body.current
            callback(undefined, {
                description: weather_descriptions[0],
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast
