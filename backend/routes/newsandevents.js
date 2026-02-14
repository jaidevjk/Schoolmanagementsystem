
const express =require("express");
const router  = express.Router();
const newsandevents =require('../controller/newsandeventsController');


router.post("/",newsandevents.createEvent);
router.get("/",newsandevents.fetchEvent);
router.delete("/:id",newsandevents.deleteEvent);

module.exports = router;