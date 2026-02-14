
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt =require("jsonwebtoken");
const dotenv = require("dotenv");
const authenticationMiddleware = require("../middlewares/authentication");

dotenv.config({ path: "./config/config.env" });

const config = require('../config/default');

dotenv.config("./config/config.env");
const jwtsecretO = config.jwtsecret; 

// const secret = process.env.SECRET;
const secret = jwtsecretO;
// console.log(secret)

const createUser = async(req,res) =>{
    
const { email, password , name,role,subject} = req.body;
console.log(email)
  try {
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json(`User Already Exist With this email: ${email}`);
    }
    const user = new Admin({ email, password, name,role,subject});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save()
    .then(Newuser => {
                        jwt.sign(
                            { id: user._id },
                            // 
                            secret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        role:user.role
                                    }
                                });
                            }
                        )
                    });

  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in creating new user");
  }

}

const  loginUser = async (req, res) => {

//

const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    Admin.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        { id: user._id },
                        secret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role:user.role
                                }
                            });
                        }
                    )
                })
        })

};
const listTeachers = async  (req,res) => {
  // const { email, password } = req.body;
    const teachersList = await Admin.find({ role: 'teacher' });
           res.status(200).json(teachersList);
        
}
// const listUsers = (req,res) => {
//     Admin.findById(req.user.id)
//         .select('-password')
//         .then(user => res.json(user));
// }

module.exports = {createUser,loginUser,listTeachers};