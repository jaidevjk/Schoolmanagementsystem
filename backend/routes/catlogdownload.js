const express = require("express");
const {
  createCatlogDownload,
  fetchCatlogDownload,
  deleteCatlogDownload,
  catlogDownload,
} = require("../controller/catlogdownloadController.js");
//const auth = require("../middlewares/auth.js");

const router = express.Router();

router.post("/", createCatlogDownload);
router.get("/",  fetchCatlogDownload);
router.delete("/:id", deleteCatlogDownload);
router.get("/download/:productname",catlogDownload);


module.exports = router;
