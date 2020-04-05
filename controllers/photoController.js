const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')

router.get('/', (req, res) => {
	res.send("controller working")
})

router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

router.post('/', (req, res, next) => {
	console.log("\nreq.body:", req.body);
	res.send('hitting the post route for photos')
})





module.exports = router