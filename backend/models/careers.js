const mongoose = require('mongoose');

const careersScheme = new mongoose.Schema({
	state: { type: String, required: true },
    position: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    qualification:{type:String,required:true},
	cv:{type:String,require:true},
	message: { type: String },
	date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });
module.exports = mongoose.model('careers',careersScheme);