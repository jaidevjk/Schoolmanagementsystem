const Subscriber = require("../models/subscription.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

exports.createSubscription = async (req, res) => {
  const { email } = req.body;
  console.log(req.body.email);

  try {
    const existingUser = await Subscriber.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json(`User Already Exist With this email: ${email}`);
    }
    const user = await new Subscriber({ email });

   

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //    user:"multiplexdronealerts@gmail.com",
    //    pass:"irewyyqniyjrpcic"
    //   },
    // });

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
      to: `${email}`,
      cc:"aditya@multiplexdrone.com",
      subject: "Subscription for Multiplex Drone Pvt. Ltd",
      text: "Multiplex Drone Pvt. Ltd",
      html: "<h1>Multiplex Drone Pvt. Ltd</h1>Hello, Thanks for subscribing. You will get notification of latest articles posted on our website. Please do not reply to this email. <br/> <b>Thankyou!</b>",
    };

const transporterOne = nodemailer.createTransport({
       host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
       user:process.env.EMAIL_USER,
       pass:process.env.EMAIL_PASS
      },
    });

    const optionsOne = {
      from: "alerts@multiplexdrone.com",
      to: `corporate@multiplexdrone.com`,//corporate@multiplexdrone.com
      cc:"aditya@multiplexdrone.com",
      subject: "Subscription for Multiplex Drone Pvt. Ltd",
      text: "Multiplex Drone Pvt. Ltd",
      html: `<h1>Multiplex Drone Pvt. Ltd</h1><br/> <h3>New Subscriber</h3> <p>Email Id: ${email}</p>  <p>Description: Hi,am kindly requesting you to add my subscription for my further quieries</p>   <b>Thankyou!</b>`,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });
    transporterOne.sendMail(optionsOne, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: " + info.response);
    });

    // Mail sent ends
    user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in creating new user");
  }
}

// user: "jaidevjk097@gmail.com",
//        pass: "oeoxjufrzerlxhko",