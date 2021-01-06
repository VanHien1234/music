const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login");
router.post("/artist", adminController.newArtist);
router.post("/album", adminController.newAlbum);
router.post("/track", adminController.newTrack);
router.post("/genre", adminController.newGenre);
router.delete("/deleteArtist/:id", adminController.removeArtist);
router.put("/updateArtist/:id", adminController.updateArtist);
module.exports = router;
