require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const PORT = process.env.PORT


//db
require('./db/db')

// MIDDLEWARE
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))



// SESSIONS
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

// controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)
const userController = require('./controllers/userController')
app.use('/users', userController)
const photoController = require('./controllers/photoController')
app.use('/photos', photoController)

// home
app.get('/', (req, res) => {
	let messageToDisplay = req.session.message
	req.session.message = ""
	res.render('home.ejs', {
		message: messageToDisplay
	})
})
// 404
app.get('*', (req, res) => {
	res.render('404.ejs')
})
app.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Running on ${PORT}`);
})



