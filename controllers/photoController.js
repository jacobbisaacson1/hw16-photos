const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')

// router.get('/', (req, res) => {
// 	res.send("photo controller working")
// })

router.get('/', async (req, res, next) => {
	try {
		const foundPhotos = await Photo.find({})
		console.log("\nfound photos:", foundPhotos);
		res.render('photos/index.ejs', {
			photos: foundPhotos
		})
	} catch(err) {
		next(err)
	}
})

router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

router.post('/', async (req, res, next) => {
	try {
		const createdPhoto = await Photo.create(req.body)
		console.log("\ncreated photo:", createdPhoto);
		res.redirect('/photos/' + createdPhoto.id)
		} catch(err) {
			next(err)
		}
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