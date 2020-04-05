const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send("controller working")
})

router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

router.post('/', (req, res, next) => {
	res.send('hitting the post route for photos')
})





module.exports = router