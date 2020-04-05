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
// server.use(session({
// 	secret: process.env.SESSION_SECRET,
// 	resave: false,
// 	saveUninitialized: false
// }))

//controllers
const photoController = require('./controllers/photoController')
server.use('/photos', photoController)

const userController = require('./controllers/userController')
server.use('/users', userController)


server.get('/register', (req, res) => {
  const message = req.session.message
  req.session.message = ''
  res.render('home.ejs', {
    message: message
  })
})

server.get('/register', (req, res) => {
  console.log(req.session); 
  res.render('register.ejs')
})

server.post('/register', (req, res) => {
  console.log(req.body, "was clicked");
  req.session.username = req.body.username 
  req.session.password = req.body.password// want to store the username and passwor here?
  res.redirect('/register')

})

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




