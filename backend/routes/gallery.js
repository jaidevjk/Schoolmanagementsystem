
const express =require("express");
const router  = express.Router();
const gallery =require('../controller/galleryController');


router.post("/",gallery.createGallery);
router.get("/:category",gallery.fetchGallery);
router.delete("/:id",gallery.deleteGallery);
router.patch("/:id",gallery.updateGallery);
module.exports = router;