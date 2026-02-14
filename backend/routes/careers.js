const express =require("express");
const router  = express.Router();
const careersController  = require("../controller/careersController");

router.post("/",careersController.createCareers);
router.get("/",careersController.fetchCareer);
router.get("/searchby/:search",careersController.getCareerBySearch);
router.get("/:id",careersController.fetchSingleCareer);
router.patch("/:id",careersController.updateCareers);
router.delete("/:id",careersController.deleteCareer);

module.exports = router;