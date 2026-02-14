const Career = require("../models/careers.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
 

exports.createCareers = async (req, res) => {
  const application = req.body;
  const { cv } = req.body;
  const { email,position} = req.body;

  console.log(email);

  try {
    // const existingUser = await Career.findOne({email,position});

    //  if (existingUser) {
    //   return res
    //     .status(400)
    //     .json(`You Have Already Applied For This Job`);
    // }
    
        const career = await new Career( application );
    
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
          subject: "Job Application for Multiplex Drone Pvt. Ltd",
          text: "Multiplex Drone Pvt. Ltd",
          html: "<h1>Multiplex Drone Pvt. Ltd</h1>Hello, Thanks for showing interest in joining our team. You will get notification of latest articles posted on our website. Please do not reply to this email. <br/> <b>Thankyou!</b>",
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
          subject: "Job Application for Multiplex Drone Pvt. Ltd",
          text: "Multiplex Drone Pvt. Ltd",
          html: `<h1>Multiplex Drone Pvt. Ltd</h1><br/> <h3>New Career</h3>   <p>Description: Hi,am kindly requesting you to consider my profile for recruitment.</p>   <b>Thankyou!</b>`,
          attachments : [
            {
                filename: "Cv.pdf",
                path: cv,
            }
        ]
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
        career.save();
        res.status(201).json({ career });
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in creating new user");
  }
}

exports.fetchCareer = async (req, res) => {
  const career = await Career.find();
  try {
    res.status(200).send(career);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Career");
  }
};

exports.deleteCareer = async (req, res) => {
  const id = req.params.id;
  try {
    await Career.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.updateCareers = async (req, res) => {
  const id = req.params.id;
  const updateCareer = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Career.findByIdAndUpdate(id, updateCareer, {
      new: true,
    });
    res.json(updateCareer);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating career");
  }
};

exports.fetchSingleCareer = async (req, res) => {
  const post = req.params.id;
  const getPost = await Career.findById(post);

  try {
    res.status(200).send(getPost);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Career");
  }
};

// exports.getCareerBySearch = async (req, res) => {
//   const { search } = req.query;
//   try {
//     const searchState = new RegExp(search, "i");
//     const searchPosition = new RegExp(search, "i");
//     const searchDepartment = new RegExp(search, "i");
//     const posts = await Career.find({
//       $or: [
//         { state: searchState },
//         { position: searchPosition },
//         { department: searchDepartment },
//       ],
//     });
//     res.status(200).send(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(409).send("Some thing went wrong in Searching posts");
//   }
// };

exports.getCareerBySearch = async (req, res) => {
  const search = req.params.search.toString();
  console.log(search)
  try {
     
    
    const searchEmail = new RegExp(search,"ig" );
    const searchPhoneNumber = new RegExp(search,"ig");
    // const searchPosition = new RegExp(search, "ig");
    // const searchQualification = new RegExp(search, "ig");
    const posts = await Career.find({
      $or: [
       
        { email: searchEmail,"$options": "igx" },
        { mobile: searchPhoneNumber,"$options": "igx" },
        // {position: searchPosition,"$options": "igx" },
        // {qualification: searchQualification,"$options": "igx" },
      ],
    });

    // await Career.find(search,function(err, data)
    //     res.json(data)});
    //const posts = Career.find({'$**': `${/search/gi}`});
    //  const posts = await Career.find({
    //   $or: [
    //     search/g/i 
        
    //   ],
    // });
    console.log(posts)
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in Searching posts");
  }
};

// const searchEmail = new RegExp(escapeRegex(search),"ig" );
//     const searchPhoneNumber = new RegExp(escapeRegex(search),"ig");
//     const searchPosition = new RegExp(escapeRegex(search), "i");