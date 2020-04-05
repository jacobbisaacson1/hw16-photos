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

router.get('/:id', async (req, res, next) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id)
		res.render('photos/show.ejs', {
			photo: foundPhoto
		})
	} catch(err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const createdPhoto = await Photo.create(req.body)
		console.log("\ncreated photo:", createdPhoto);
		res.redirect('/photos/') // can add "+ createdPhoto.id" later to render that specic photo id page
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

router.delete('/:id', async (req, res, next) => {
	try {
		const deletedPhoto = await Photo.findByIdAndRemove(req.params.id)
		console.log("\ndeleted photo:", deletedPhoto); // yep
		res.redirect('/photos')
	} catch(err) {
		next(err)
	}
})


router.get('/id:/edit', async (req, res, next) => {
	try {
		const editedPhoto = await Photo.findById(req.params.id)
		console.log("\nedited photo:", editedPhoto);
		res.send("trying to get to editedPhoto page with form to edit")
		// res.render('photos/edit.ejs', {
		// 	photo: editedPhoto
		// })
	} catch(err) {
		next(err)
	}
})

router.put('/id:', async (req, res, next) => {
	try {
		const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true })
		console.log("\nupdated photo:", updatedPhoto);
		res.redirect(`/photos/${updatedPhoto._id}`)
	} catch(err) {
		next(err)
	}
})




module.exports = router













