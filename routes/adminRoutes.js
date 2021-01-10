const express = require("express");
const router = express.Router();
const {login,admin} = require("../middlewares/authCheck");

const multer = require("multer")
const upimg = multer({dest:'imageDATA'},)
//const upload = require("../middlewares/upload")
const adminController = require("../controllers/adminController");

//router.post("/login");
router.post("/artist",upimg.single('image'), adminController.newArtist);
router.post("/album",login,admin, adminController.newAlbum);
router.post("/track",login,admin, adminController.newTrack);
router.delete("/deleteArtist/:id",login,admin, adminController.removeArtist);
router.put("/updateArtist/:id", adminController.updateArtist);


module.exports = router;

