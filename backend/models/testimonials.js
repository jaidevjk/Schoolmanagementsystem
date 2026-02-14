const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
	name:{type:String,required:true},
	designation:{type:String,required:true},
	description:{type:String,required:true, max: 250 },
	img:{type:String,required:true },
	category:{type:String,required:true},
	date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });

module.exports = mongoose.model("Testimonials",  TestimonialSchema);