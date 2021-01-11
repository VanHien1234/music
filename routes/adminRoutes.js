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
router.post("/artist",login,admin,upimg, adminController.newArtist);
router.post("/album",login,admin,upimg, adminController.newAlbum);
router.post("/track",login,admin,upimg,upmusic, adminController.newTrack);
router.delete("/deleteArtist/:id",login,admin, adminController.removeArtist);
router.put("/updateArtist", adminController.updateArtist);


module.exports = router;

