const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define paths for express
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About me' })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page ;D'
    })
})

app.post('/', (req, res, next) => {
    if (!req.body.location) {
        return res.render('index', {
            title: 'Weather App',
            error: 'You must provide a valid address'
        })
    }

    geoCode(
        req.body.location,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.render('index', {
                    title: 'Weather App',
                    error: error.message
                })
            }
            forecast(
                latitude,
                longitude,
                (
                    error,
                    {
                        description,
                        temperature,
                        feelslike,
                        humidity,
                        wind_speed
                    } = {}
                ) => {
                    if (error) {
                        return res.render('index', {
                            title: 'Weather App',
                            error: error.message
                        })
                    }
                    return res.render('index', {
                        title: 'Weather App',
                        location,
                        description,
                        temperature,
                        feelslike,
                        humidity,
                        wind_speed
                    })
                }
            )
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', { title: '404', message: 'Help article not found' })
})

app.get('*', (req, res) => {
    res.render('404', { title: '404', message: 'Page not found' })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running')
})
