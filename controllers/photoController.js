const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')

router.get('/', (req, res) => {
	res.send("controller working")
})

router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

router.post('/', async (req, res, next) => {
	try {
		await Photo.create(req.body)
		res.redirect('/photos')
	} catch(err) {
		next(err)
	}
})





module.exports = router