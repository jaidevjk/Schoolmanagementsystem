const mongoose = require("mongoose");


const sparyserviceenquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  contactnumber: { type: String, required: true},
  message:{type: String, required: true},
  place: { type: String, required: true},
  crop: { type: String, required: true },
  acre:{type: String, required: true,},
  date: { type: String, default:new Date().toLocaleDateString()},
  time:{type:String,default:new Date().toLocaleTimeString()}
},{ timestamps: true });

const Enquiry = mongoose.model("sparyserviceenquiries", sparyserviceenquirySchema);

module.exports = Enquiry;


 /*acre:{type: String, required: true,validate: {
            validator: function(val) {
              console.log(typeof val)
                return  /^\d*$/.test(val);
            },
            message: val => `${val.value} value has to be number`
        }},

validate: {
            validator: function(val) {
                return val.toString().length ===10
            },
            message: val => `${val.value} has to be 10 digits`
        }

        */