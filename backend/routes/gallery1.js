const express = require("express");
const {
  createGallery,
  deleteGallery,
  getGallery,
  updateGallery,
} = require("../controller/galleryController1.js");
const auth = require("../middlewares/authentication.js");
const router = express.Router();

router.post("/", auth, createGallery);
router.get("/", getGallery);
router.delete("/:id", auth, deleteGallery);
router.patch("/:id", auth, updateGallery);

module.exports = router;
