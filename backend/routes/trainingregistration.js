const express = require("express");
const {
  createTrainingRegistration,
  alreadyRegisteredOne,
  fetchTrainingRegistration,
  fetchTrainingRegisteredOne,
  updateRegisteredOne,
  deleteTrainingRegistration,
  getRegisteredBySearch
} = require("../controller/trainingregistrationController.js");
//const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", createTrainingRegistration);
router.put("/registeredOne/:_Id", alreadyRegisteredOne);
router.get("/",  fetchTrainingRegistration);
router.get("/:EmailId", fetchTrainingRegisteredOne);
router.patch("/:ObjectId", updateRegisteredOne);
router.delete("/:id", deleteTrainingRegistration);
router.get("/search/:search",getRegisteredBySearch);
module.exports = router;
