const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
	res.send('user route finally')
})







module.exports = router