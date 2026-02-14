const mongoose = require("mongoose");

const VisitorsSchema = new mongoose.Schema({
   name: String,
    count: Number
});

module.exports = mongoose.model("Visitors",  VisitorsSchema);