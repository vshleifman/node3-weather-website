const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directoey to serve
app.use(express.static(publicDirPath))

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Victor Altas'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'Help example',
    name: 'Victor Altas'
  })
})

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Victor Altas'
  })
})



app.get('/weather', (req, res) => {
  if (!req.query.address) {
   return res.send({
      error: 'You must provide an address'
    })
  }
  
  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    
    if(error) {
      return res.send({ error });
    } 
    
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error });
      }

      res.send({ 
        forecast: forecastData,
        location,
        address: req.query.address
      })   
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    error: 'Help article not found'
  })
})

app.get('/*', (req, res) => {
  res.render('404',{
    error: '404. Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port' + port);
})