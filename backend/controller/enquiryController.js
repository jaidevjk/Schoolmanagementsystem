const Enquiry = require("../models/enquiry.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });


/*const dotenv = require("dotenv");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });*/

//dotenv.config({ path: "./config/config.env" });

exports.createEnquiry = async (req, res) => {
  const enquiry = req.body;
  const { email } = req.body;
  //console.log(enquiry);

  try {
    //const existingUser = await Enquiry.findOne({ email });
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .json(`User Already Exist With this email: ${email}`);
    // }
    const newEnquiry = new Enquiry(enquiry);

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
       user:process.env.EMAIL_USER,
       pass:process.env.EMAIL_PASS
      },
    });

    // var transporter = nodemailer.createTransport({
    //   host: "smtp-mail.outlook.com",
    //   secureConnection: false,
    //   port: 587,
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASS,
    //   },
    // });

    const options = {
      from: "alerts@multiplexdrone.com",
      to: "marketing@multiplexdrone.com",
      cc:"aditya@multiplexdrone.com",
      subject: "New Marketing Enquiry | Multiplex Drone Group Enquires",
      text: "New Marketing Enquiry | Multiplex Drone Group Enquires",
      html: `<h2>Multiplex Drone Group</h2><br/> <h3>New Marketing Enquiry</h3> <p>Name: ${enquiry.name}</p> <p>Email Id: ${enquiry.email}</p> <p>Mobile Number: ${enquiry.contactnumber}</p> <p>Place: ${enquiry.place}</p> <p>Description: ${enquiry.message}</p>   <b>Thankyou!</b>`,
    };
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });

    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (error) {
    console.log(error);
    res.status(409).json(error.message);
  }
};

exports.fetchEnquiries = async (req, res) => {
  const enquiry = await Enquiry.find();
  try {
    res.status(200).send(enquiry);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Enquires");
  }
};

exports.deleteEnquiries = async (req, res) => {
  const id = req.params.id;
  try {
    await Enquiry.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};
