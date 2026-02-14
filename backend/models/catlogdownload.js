const mongoose = require("mongoose");

const catlogdownloadSchema = new mongoose.Schema({
    username: { type: String, required: true},
    contactnumber: { type: Number, required: true },
    email: { type: String, required: true },
    productname:{type:String,required:true},
    date: { type: String, default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()},
},{
       timestamps: true,
       get: time => time.toDateString()
    });

module.exports = mongoose.model("catlogdownload",  catlogdownloadSchema);