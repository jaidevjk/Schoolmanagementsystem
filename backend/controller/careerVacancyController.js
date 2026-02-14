const CareersVacancy = require("../models/careervacancy.js");
const mongoose = require("mongoose");

exports.createCareerVacancy = async (req, res) => {
  const careers = req.body;
  const newCareers = new CareersVacancy(careers);
  try {
    await newCareers.save();
    res.status(201).json(newCareers);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in creating new Career");
  }
};

exports.fetchCareerVacancy = async (req, res) => {
  const career = await CareersVacancy.find();
  try {
    res.status(200).send(career);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Career");
  }
};

exports.deleteCareerVacancy = async (req, res) => {
  const id = req.params.id;
  try {
    await CareersVacancy.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.updateCareersVacancy = async (req, res) => {
  const id = req.params.id;
  const updateCareer = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await CareersVacancy.findByIdAndUpdate(id, updateCareer, {
      new: true,
    });
    res.json(updateCareer);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};

exports.getCareerVacancyBySearch = async (req, res) => {
  const { search } = req.query;
  console.log("calling");
  try {
    const searchState = new RegExp(search, "i");
    const searchPosition = new RegExp(search, "i");
    const searchDepartment = new RegExp(search, "i");
    const posts = await CareersVacancy.find({
      $or: [
        { state: searchState },
        { position: searchPosition },
        { department: searchDepartment },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in Searching posts");
  }
};
