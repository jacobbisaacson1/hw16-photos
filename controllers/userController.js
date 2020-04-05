const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const User = require('../models/user')

router.get('/', async (req, res, next) => {
	try {
		const foundUsers = await User.find({}).populate('photo').exec()
		console.log("\n users found with populate for photos user:", foundUsers);
		res.render('users/index.ejs', {
			users: foundUsers
		})
		res.redirect('/users')
	} catch(err) {
		next(err)
	}
})

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

router.post('/', async (req, res, next) => {
	try {
		const createdUser = await User.create(req.body)
		console.log("\ncreated user:", createdUser);
		res.send(createdUser)
	} catch(err) {
		next(err)
	}
})





module.exports = router


