const express = require("express");

const router = express.Router();

const musicController = require("../controllers/musicController");
const auth = require("../middlewares/authCheck");


// ALL Artist list
router.get("/artist", musicController.allArtist);
//ALL albums of Artist
router.get("/artist/:id",  musicController.getAlbumsByArtis);

//album
router.get("/album", musicController.allAlbums);
router.get("/album/:id",  musicController.getAlbumDetails);
//track
router.get("/track", musicController.allTracks);
router.get("/track/:id", musicController.getTrackDetails);
router.get("/play/:id", musicController.playTrack);
router.get("/genre/:id",musicController.genreTrack);

router.use("/",  musicController.topAlbums);

module.exports = router;
