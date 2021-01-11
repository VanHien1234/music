const express = require("express");
const router = express.Router();
const {login,admin} = require("../middlewares/authCheck");

const multer = require("multer")
//const upimg = multer({dest:'imageDATA'},)
const upimg = require("../middlewares/uploadimg")
const upmusic = require("../middlewares/uploadmusic")
const adminController = require("../controllers/adminController");
const upload = require("express-fileupload")


router.use(upload())


//router.post("/login");
router.post("/artist",upimg, adminController.newArtist);
router.post("/album",upimg, adminController.newAlbum);
router.post("/track",upimg,upmusic, adminController.newTrack);
router.delete("/deleteArtist/:id",login,admin, adminController.removeArtist);
router.put("/updateArtist", adminController.updateArtist);


module.exports = router;

