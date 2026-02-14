

const jwt =require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require('../config/default');
var cors = require('cors');
// app.use(cors());

//dotenv.config("./config/config.env");
const jwtsecretO = config.jwtsecret; 
//console.log(jwtsecretO);

module.exports = (req,res,next)=>{
	// const secret = process.env.SECRET;
	// const token =req.header("token");
	const secret = jwtsecretO;
	try {
    // const token = req.header("Authorization");
    const token = req.header("regtoken");
    console.log(token)
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }

}