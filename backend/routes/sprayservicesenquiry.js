const express = require("express");
const {
  createServicesEnquiry,
  fetchServicesEnquiry,
  deleteServicesEnquiry,
} = require("../controller/sprayservicesController.js");
//const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", createServicesEnquiry);
router.get("/",  fetchServicesEnquiry);
router.delete("/:id", deleteServicesEnquiry);
module.exports = router;
