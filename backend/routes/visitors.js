const express =require("express");
const router  = express.Router();
const visitors =require('../controller/visitorsController');



router.get("/visitorsCount",visitors.getVisitors);
router.post("/",visitors.countVisitors);

module.exports = router;
