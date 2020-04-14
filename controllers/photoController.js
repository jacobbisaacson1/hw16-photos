const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Photo = require('../models/photo')

//for indexing
router.get('/', async (req, res, next) => {
	try	{
		const foundPhotos = await Photo.find({}).populate('user')
		res.render('photo/index.ejs', {
			photos: foundPhotos
		})
	} catch (error) {
		next(error)
	}
})

// for new
router.get('/new', (req, res) => {
	messageToDisplay = req.session.message
	req.session.message = ""
	res.render('photo/new.ejs', {
		message: messageToDisplay
	})
})

// to create
router.post('/new', async (req, res, next) => {
	try {
		if(req.session.loggedIn) {
			req.body.user = req.session.userId
			req.body.username = req.session.username
			const newPhoto = await Photo.create(req.body)
			req.session.message = "Nice! You uploaded a photo!"
			res.redirect('/')
		} else {
			req.session.message = `Sorry, you need to sign in / register to upload a photo`
			res.redirect('/auth/login')
		}

	} catch (error) {
		next(error)
	}
})

// show route

router.get('/:id', async (req, res, next) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id).populate('user')
		const currentUser = req.session.userId
		res.render('photo/show.ejs', {
			photo: foundPhoto,
			currentUser: currentUser
		})
	} catch (error) {
		next(error)
	}
})


// edit route
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id).populate('user')
		res.render('photo/edit.ejs', {
			photo: foundPhoto
		})
	} catch (error) {
		next(error)
	}
})

//update
router.put('/:id/', async (req, res, next) => {
	try {
		const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect(`/photos/${req.params.id}`)
	} catch (error) {
		next(error)
	}
})


// delete / destroy
router.delete('/:id', async (req, res, next) => {
	try {
		const photoToDelete = await Photo.findByIdAndDelete(req.params.id)
		req.session.message = "Photo deleted!"
		res.redirect('/')
	} catch (error) {
		next(error)
	}
})


module.exports = router













