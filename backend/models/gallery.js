const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
	description:{type:String,required:true, max: 250 },
	img:{type:String,required:true },
	eventdate:{type:String,required:true},
	category:{type:String,required:true},
	date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });

module.exports = mongoose.model("Gallerys",  GallerySchema);