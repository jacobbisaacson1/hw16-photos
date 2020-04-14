require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT


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

// CONTROLLERS
const authController = require('./controllers/authController')
app.use('/auth', authController)
const userController = require('./controllers/userController')
app.use('/users', userController)
const photoController = require('./controllers/photoController')
app.use('/photos', photoController)


// render home
app.get('/', (req, res) => {
	let messageToDisplay = req.session.message
	const session = req.session
	req.session.message = ""

	res.render('home.ejs', {
		message: messageToDisplay,
		session: session
	})
})

// 404
app.get('*', (req, res) => {
	const session = req.session
	res.render('404.ejs', {
		session: session
	})
})

app.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Running on ${PORT}`);
})



