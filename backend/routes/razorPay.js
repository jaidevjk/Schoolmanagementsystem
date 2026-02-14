
const express =require("express");
const router  = express.Router();
const {
  verification,
  payment,
} = require("../controller/RazorpayController.js");

router.post("/verification", verification);
router.post("/payment/:amount", payment);
module.exports = router;
