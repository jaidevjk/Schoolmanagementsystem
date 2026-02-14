const mongoose = require("mongoose");


const careerVacancySchema = new mongoose.Schema({
  state: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  num: { type: String, required: true },
  othersDep: { type: String },
  qualification: { type: String },
  date: { type: String, default:new Date().toLocaleDateString()},
  time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });

module.exports = mongoose.model("CareersVacancy", careerVacancySchema);

 