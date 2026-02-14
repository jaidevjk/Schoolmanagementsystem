const CatlogDownload = require("../models/catlogdownload.js");
const path = require('path');
const fs = require('fs');
let completePath = path.join(__dirname+"/../views/catlogs/");

exports.createCatlogDownload = async (req, res) => {
  const catlogdownload = req.body;
   const { productname } = req.body;
  //console.log( productname );
  //console.log(catlogdownload)

  try {
    
    const newCatlogDownload = new CatlogDownload({
   username: req.body.name,
   email: req.body.email,
   contactnumber:req.body.contactnumber,
   productname: req.body.productname
});
    //console.log(newCatlogDownload)
    await newCatlogDownload.save();
    //res.download(completePath+`document.pdf`)
    // console.log(completePath+`${productname}.pdf`)
     res.download(completePath+`${productname}.pdf`)
      //res.send("got it")
  } catch (error) {
    console.log(error);
    res.status(409).json(error.message);
  }
};




exports.fetchCatlogDownload = async (req, res) => {
  const catlogDownload = await CatlogDownload.find();
  try {
    res.status(200).send(catlogDownload);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching CatlogDownload");
  }
};

exports.deleteCatlogDownload = async (req, res) => {
  const id = req.params.id;
  try {
    await CatlogDownload.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.catlogDownload = async (req, res) => {
  const productname=req.params.phonenumber
  try {
  
    res.download(completePath+`${productname}.pdf`);
  
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching CatlogDownload");
  }
};