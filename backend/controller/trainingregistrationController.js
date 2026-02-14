const TrainingRegistration = require("../models/registration.js");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });




exports.createTrainingRegistration = async (req, res) => {
  const trainingRegistration = req.body;
  const { email } = req.body;
  console.log(trainingRegistration);

  

  try {
           
            const newTrainingRegistration = new TrainingRegistration(trainingRegistration);

              const transporter = nodemailer.createTransport({
              host: "smtp-mail.outlook.com",
              port: 587,
              secure: false,
              auth: {
               user:process.env.EMAIL_USER,
               pass:process.env.EMAIL_PASS
              },
              });


              const options = {
              from: "alerts@multiplexdrone.com",
              to: "training@multiplexdrone.com",
              cc:"aditya@multiplexdrone.com",
              subject: "New  Training Registration | Multiplex Drone Group Training Registration",
              text: "New  Training Registration | Multiplex Drone Group Training Registration",
              html: `<h2>Multiplex Drone Group</h2><br/> <h3>New Training Registration</h3> <p>Name: ${trainingRegistration.name}</p> <p>Email Id: ${trainingRegistration.email}</p> <p>Mobile Number: ${trainingRegistration.contactnumber}</p> <p>Place: ${trainingRegistration.address}</p> <p>Qualification: ${trainingRegistration.qualification}</p> <p>Passport Number: ${trainingRegistration.passportnumber}</p> <p>Training Level: ${trainingRegistration.traininglevel}</p>   <b>Thankyou!</b>`,
              };
              transporter.sendMail(options, function (err, info) {
              if (err) {
               console.log(err);
               return;
              }
              console.log("Sent: " + info.response);
              });


             const transporterUser = nodemailer.createTransport({
                  host: "smtp-mail.outlook.com",
                  port: 587,
                  secure: false,
                  auth: {
                   user:process.env.EMAIL_USER,
                   pass:process.env.EMAIL_PASS
                  },
                });

                const optionsUser = {
                  from: "alerts@multiplexdrone.com",
                  to: `${email}`,
                  cc:"aditya@multiplexdrone.com",
                  subject: "Registration for Drone Training at Multiplex Drone Pvt. Ltd",
                  text: "Multiplex Drone Pvt. Ltd",
                  html: "<h1>Multiplex Drone Pvt. Ltd</h1>Hello, Thanks for Registration. You will get notification of latest articles posted on our website. Please do not reply to this email. <br/> <b>Thankyou!</b>",
                };
            transporterUser.sendMail(optionsUser, function (err, info) {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log("Sent: " + info.response);
                });

              await newTrainingRegistration.save();
              res.status(201).json(newTrainingRegistration);
          

  } catch (error) {
    console.log(error);
    res.status(409).json(error.message);
  }
};

exports.fetchTrainingRegistration = async (req, res) => {
  // const TrainingRegistration = await TrainingRegistration.find();
  // try {
  //   res.status(200).send(TrainingRegistration);
  // } catch (error) {
  //   console.log(error);
  //   res.status(409).send("Some thing went wrong in fetching TrainingRegistration");
  // }
  TrainingRegistration.find(function(err, users_list) {
        if(err){
            res.json(err);
        } else {
            // console.log("one:",users_list);
            res.json({status: 1, data: users_list});

        }
    })
  
};

exports.fetchTrainingRegisteredOne = async (req, res) => {
  const emailId = req.params.EmailId;
  console.log(emailId);
  TrainingRegistration.find({email:emailId}).exec((error,registered_list)=>{
    if(error){
      res.json(error)
    } else {
       res.json(registered_list);
    }
  })
  
  
};


exports.alreadyRegisteredOne = async (req, res) => {
  const id = req.params._Id;
  console.log(id)
  const updateRegisteredOne = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await TrainingRegistration.findByIdAndUpdate(id, updateRegisteredOne, {
      new: true,
    });
    res.json(updateRegisteredOne);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};


exports.updateRegisteredOne = async (req, res) => {
  const id = req.params.ObjectId;
  
  console.log(id)
  const updateRegisteredOne = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await TrainingRegistration.findByIdAndUpdate(id,{ "$set": {"paymentdetails":updateRegisteredOne,"payment":"Success"}}).exec(function(err, TrainingRegistration){
   if(err) {
       console.log(err);
       res.status(500).send(err);
   } else {
    //console.log(updateRegisteredOne)
    //console.log(TrainingRegistration)
     
            res.status(200).send(TrainingRegistration);
   }
})

  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};


exports.deleteTrainingRegistration = async (req, res) => {
  const id = req.params.id;
  try {
    await TrainingRegistration.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.getRegisteredBySearch = async (req, res) => {
  const search = req.params.search;
  console.log(search)
  try {
     const searchEmail = new RegExp(search,"ig" );
    const searchPhoneNumber = new RegExp(search,"ig");
    const searchTraninigLevel = new RegExp(search,"ig" );
    const searchPassportNumber = new RegExp(search,"ig" );
    const registered_list = await TrainingRegistration.find({
      $or: [
        { email: searchEmail,"$options": "igx" },
        { contactnumber: searchPhoneNumber,"$options": "igx" },
        { traininglevel: searchTraninigLevel,"$options": "igx" },
        { passportnumber:searchPassportNumber,"$options": "igx" },
      ],
    });

    console.log(registered_list)
    res.status(200).send(registered_list);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in Searching registered_list");
  }
};