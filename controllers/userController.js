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
		messageToDisplay = req.session.message
		res.render('user/edit.ejs', {
			user: foundUser,
			currentUser: currentUser,
			message: messageToDisplay
		})
	} catch (error) {
		next(error)
	}
})

// update route
router.put('/:id', async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		req.session.message = "Updates Saved"
		res.redirect(`/users/${req.params.id}`)
	} catch (error) {
		next(error)
	}
})


// delete route 

router.delete('/:id', async (req, res, next) => {
	try {
		const userToDelete = await User.findByIdAndDelete(req.params.id)
		const photosToDelete = await Photo.remove({ user: req.params.id })
		await req.session.destroy()
		res.render('user/deleted.ejs')
	} catch (error) {
		next(error)
	}
})





module.exports = router


