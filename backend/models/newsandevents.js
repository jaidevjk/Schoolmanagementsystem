const mongoose = require("mongoose");

const NewsAndEventsSchema = new mongoose.Schema({
	description:{type:String,required:true, max: 250 },
	img:{type:String,required:true },
	eventdate:{type:String,required:true},
	date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()}
});

module.exports = mongoose.model("NewsAndEventss",  NewsAndEventsSchema);