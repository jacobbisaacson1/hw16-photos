const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')

router.get('/new', async (req, res) => {
	try {
		const foundPhotosForUser = await Photo.find({})
		console.log("\nfound photos for user:", foundPhotosForUser);
		res.render('users/new.ejs', {
			photos: foundPhotosForUser
		})
	} catch(err) {
		next(err)
	}
})







module.exports = router


