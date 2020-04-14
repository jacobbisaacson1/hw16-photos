const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Photo = require('../models/photo')

//for user page
router.get('/', async (req, res, next) => {
	try {
		const foundUsers = await User.find({})
		res.render('user/index.ejs', {
			users: foundUsers
		})
	} catch (error) {
		next(error)
	}

})


//show route

router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		const foundPhotos = await Photo.find({ user: req.params.id })
		const currentUser = req.session.userId
		console.log(foundUser);
		console.log(currentUser);
		res.render('user/show.ejs', {
			user: foundUser,
			photos: foundPhotos,
			currentUser: currentUser
		})
	} catch (error) {
		next(error)
	}
})

// edit route
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		const currentUser = req.session.userId
		res.render('user/edit.ejs', {
			user: foundUser,
			currentUser: currentUser
		})
	} catch (error) {
		next(error)
	}
})

// update route
router.put('/:id', async (req, res, next) => {
	try {
		const updatedUser = await findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect(`/users/${req.params.id}`)
	} catch (error) {
		next(error)
	}
})








module.exports = router


