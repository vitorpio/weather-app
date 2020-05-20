const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoidml0b3JwaW8iLCJhIjoiY2thOGJoYjRqMGR5bjJ5bnR4M2R6M3BjZCJ9.ayKKo1ZtbfC4Vc03cTeTCA&limit=1`
    request({ url, json: true }, (error, { body: { features } }) => {
        if (error) {
            callback({
                status: 500,
                message: 'Unable to connect to weather service'
            })
        } else if (!features.length) {
            callback({
                status: 404,
                message: 'Could not find coordinates, try using other terms.'
            })
        } else {
            const { center, place_name: location } = features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

module.exports = geoCode
