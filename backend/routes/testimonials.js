
const express =require("express");
const router  = express.Router();
const testimonials =require('../controller/testimonialController');


router.post("/",testimonials.createTestimonial);
router.get("/:category",testimonials.fetchTestimonial);
router.delete("/:id",testimonials.deleteTestimonial);
router.patch("/:id",testimonials.updateTestimonial);

module.exports = router;
