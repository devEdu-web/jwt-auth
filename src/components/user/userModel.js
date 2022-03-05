const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 10,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
}, {versionKey: false});

module.exports = mongoose.model("User", userSchema);
