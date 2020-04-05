const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')

router.get('/', (req, res) => {
	res.send("photo controller working")
})

router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

router.post('/', (req, res, next) => {
	Photo.create(req.body, (err, createdPhoto) => {
		if(err) next(err) 
			else {
				console.log("\ncreated photo:", createdPhoto);
				res.send('hitting the POST ROUTE -- terminal')
			}
	})
})

// router.post('/', async (req, res, next) => {
// 	try {
// 		await Photo.create(req.body)
// 		res.redirect('/photos')
// 	} catch(err) {
// 		next(err)
// 	}
// })





module.exports = router