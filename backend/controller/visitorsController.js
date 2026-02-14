const Visitor = require('../models/visitors');
const mongoose = require("mongoose");

const countVisitors = async(req,res)=>{


let visitors = await Visitor.findOne({ name: "Visitors" });

  if (visitors == null) {
    // Creating a new default record
    const beginCount = new Visitor({
      name: "Visitors",
      count: 1,
    });
    beginCount.save();
    res.status(200).send("one person added");
  } else {
    visitors.count += 1;
    visitors.save();
    res.status(200).send(visitors);
  }

}

const getVisitors = async(req,res)=>{


    // let visitors = await Visitors.findOne({name: 'Visitor'})
  
    // // If the app is being visited first
    // // time, so no records
    // if(visitors) {
          
    //      visitors.count += 1;
  
    //     // Saving to the database
    //     visitors.save()
  
    //     // Sending the count of visitor to the browser
    //      res.status(200).send(visitors);
    //     // res.json({visitors.count})
  
    //     // Logging the visitor count in the console
    //     console.log("visitor arrived: ",visitors.count)
    // }
    // else{
          
    //     res.status(400).send("Something went wrong");
       
    // }
    const visitors = await Visitor.find();
  try {
    res.status(200).send(visitors);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Visitors");
  }

}





module.exports = {countVisitors,getVisitors}