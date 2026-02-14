const mongoose = require('mongoose');

const iframelinksScheme = new mongoose.Schema({
	link:{type:String,require:true},
	category:{type:String,required:true},
	date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });
module.exports = mongoose.model('iframelinks',iframelinksScheme);