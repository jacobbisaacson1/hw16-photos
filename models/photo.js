const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	datePosted: {
		type: Date,
		default: Date.now
	},
	title: String,
	description: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	}
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo