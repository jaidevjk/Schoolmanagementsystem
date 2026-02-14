const express = require("express");
const {
  createEnquiry,
  fetchEnquiries,
  deleteEnquiries,
} = require("../controller/enquiryController.js");
const auth = require("../middlewares/authentication.js");

const router = express.Router();

router.post("/", createEnquiry);
router.get("/",fetchEnquiries);
router.delete("/:id", deleteEnquiries);
module.exports = router;


// router.post("/", createEnquiry);
// router.get("/", auth, fetchEnquiries);
// router.delete("/:id", deleteEnquiries);