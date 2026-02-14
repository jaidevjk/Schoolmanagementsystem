const express = require("express");
const {
  createCareerVacancy,
  fetchCareerVacancy,
  deleteCareerVacancy,
  updateCareersVacancy,
  getCareerVacancyBySearch,
} = require("../controller/careerVacancyController.js");
// const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", createCareerVacancy);
router.get("/", fetchCareerVacancy);
router.get("/search", getCareerVacancyBySearch);
router.patch("/:id", updateCareersVacancy);
router.delete("/:id", deleteCareerVacancy);
module.exports = router;