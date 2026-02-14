const mongoose = require('mongoose');

const subscriptionScheme = new mongoose.Schema({
	email:{type:String,require:true},
	date: { type: String, default:new Date().toLocaleDateString()},
  time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });
module.exports = mongoose.model('subscription',subscriptionScheme);