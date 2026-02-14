const mongoose = require("mongoose");

const TrainingRegistrationSchema = new mongoose.Schema({
		name:{type:String,required:true},
		email: { type: String, required: true},
  		contactnumber: { type: String, required: true},
  address:{type: String, required: true},
  qualification: { type: String, required: true},
  passportnumber: { type: String, required: true },
  traininglevel:{type: String, required: true},
  passportcopy:{type:String,required:true},
  date: { type: Date, default: Date.now },
  payment:{type:String},
  paymentdetails:{type:Object},
  time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });
 
module.exports = mongoose.model("TrainingRegistration",  TrainingRegistrationSchema);

//default:new Date().toLocaleDateString()
//default:new Date().toLocaleDateString()

// contactnumber: { type: Number, required: true,validate: {
//             validator: function(val) {
//                 return val.toString().length ===10
//             },
//             message: val => `${val.value} has to be 10 digits`
//         }},