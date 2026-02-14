const express = require("express");
const {
  createContactEnquiry,
  fetchContactEnquiries,
  deleteContactEnquiries,
} = require("../controller/contactusController.js");
//const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", createContactEnquiry);
router.get("/",  fetchContactEnquiries);
router.delete("/:id", deleteContactEnquiries);
module.exports = router;