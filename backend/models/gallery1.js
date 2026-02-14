const mongoose = require("mongoose");

const gallery = new mongoose.Schema({
  image: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
});
module.exports =mongoose.model('gallery', gallery);
