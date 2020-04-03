const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	posted: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	url: {
		type: String,
		required: true
	}
	// or 
	// imgURL: String 

})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo