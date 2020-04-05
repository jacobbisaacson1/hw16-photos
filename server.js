require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT

//db
require('./db/db')

//midware
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false}))
server.use(methodOverride('_method'))

//controllers
const photoController = require('./controllers/photoController.js')
server.use('/photos', photoController)

server.get('/', (req, res) => {
  res.render('home.ejs')
})

server.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})

server.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
})




