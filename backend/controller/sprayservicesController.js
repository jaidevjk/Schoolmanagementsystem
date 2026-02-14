const ServicesEnquiry = require("../models/sprayservices.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });


exports.createServicesEnquiry = async (req, res) => {
  const sprayservicesenquiry = req.body;
  const { email } = req.body;
  console.log(sprayservicesenquiry);

  try {
    
    const newSprayServicesEnquiry = new ServicesEnquiry(sprayservicesenquiry);

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
      //to: "mis@multiplexgroup.com, analysis@multiplexgroup.com",
        //to: "sathish.421@gmail.com",
       to: "marketing@multiplexdrone.com",
       cc:"aditya@multiplexdrone.com",
      subject: "New Marketing ServicesEnquiry | Multiplex Drone Group Enquires",
      text: "New Marketing ServicesEnquiry | Multiplex Drone Group Enquires",
      html: `<h2>Multiplex Drone Group</h2><br/> <h3>New Marketing ServicesEnquiry</h3> <p>Name: ${sprayservicesenquiry.name}</p> <p>Email Id: ${sprayservicesenquiry.email}</p> <p>Mobile Number: ${sprayservicesenquiry.contactnumber}</p> <p>Place: ${sprayservicesenquiry.place}</p> <p>Crop: ${sprayservicesenquiry.crop}</p> <p>No of acres: ${sprayservicesenquiry.acre}</p> <p>Description: ${sprayservicesenquiry.message}</p>   <b>Thankyou!</b>`,
    };
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });

    await newSprayServicesEnquiry.save();
    res.status(201).json(newSprayServicesEnquiry);
  } catch (error) {
    console.log(error);
    res.status(409).json(error.message);
  }
};

exports.fetchServicesEnquiry = async (req, res) => {
  const ServicesEnquirys = await ServicesEnquiry.find();
  try {
    res.status(200).send(ServicesEnquirys);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Enquires");
  }
};

exports.deleteServicesEnquiry = async (req, res) => {
  const id = req.params.id;
  try {
    await ServicesEnquiry.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};
