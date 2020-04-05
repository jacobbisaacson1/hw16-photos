const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send("controller working")
})







module.exports = router