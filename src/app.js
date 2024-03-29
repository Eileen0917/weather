const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eileen'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Eileen'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Henry is pig.',
        title: 'Help',
        name: 'Eileen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: fdata,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search trem.'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error_message: 'Help article not found',
        title: '404',
        name: 'Eileen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error_message: 'Page not found',
        title: '404',
        name: 'Eileen'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})