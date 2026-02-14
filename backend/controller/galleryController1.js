const Gallery = require("../models/gallery1.js");
const mongoose = require("mongoose");

exports.createGallery = async (req, res) => {
  const testimonials = req.body;

  const newGallery = new Gallery(testimonials);
  try {
    await newGallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in creating new Article");
  }
};

exports.deleteGallery = async (req, res) => {
  const id = req.params.id;
  console.log("delete");
  try {
    await Gallery.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.getGallery = async (req, res) => {
  const posts = await Gallery.find();
  try {
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Testimonial");
  }
};

exports.updateGallery = async (req, res) => {
  const id = req.params.id;
  const updateCareer = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Gallery.findByIdAndUpdate(id, updateCareer, {
      new: true,
    });
    res.json(updateCareer);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};
