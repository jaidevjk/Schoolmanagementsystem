const mongoose = require("mongoose");


const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  contactnumber: { type: Number, required: true,validate: {
            validator: function(val) {
                return val.toString().length ===10
            },
            message: val => `${val.value} has to be 10 digits`
        }},
  message:{type: String, required: true},
  place: { type: String, required: true},
    date: { type: String, default:new Date().toLocaleDateString()},
  time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });

const Enquiry = mongoose.model("enquiries", enquirySchema);

module.exports = Enquiry;


