const mongoose = require("mongoose");
var path = require("path")
const fs = require("fs");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Track = require("../models/Track");

// Artist


exports.allArtist = (req, res, next) => {
  Artist.find({})

    .populate({
      path : 'albums',
      populate: {
        path : 'tracks',
        model : 'Track'
      }  
    })
    
    .then((artist) => {
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getAlbumsByArtis = (req, res, next) => {
  const artistId = req.params.id;
  Artist.findById(artistId)

    .then((artist) => {
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};


// ALBUMS

exports.allAlbums = (req, res, next) => {
   
  Album.find({})
    .populate('tracks')
    .populate('artist','name')
    .then((albums) => {
      console.log(albums)
      res.status(200).json(albums);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.topAlbums = (req, res, next) => {
  Album.find({
    genres: { $in: ["rock", "pop", "Rap", "chill"] },
  })

    .then((albums) => {
      res.status(200).json(albums);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getAlbumDetails = (req, res, next) => {
  const albumId = req.params.id;
  Album.findById(albumId)
    .populate('artist','name')

    .then((album) => {
      res.status(200).json(album);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};


//TRACK


exports.allTracks = (req, res, next) => {
  Track.find({})
    .populate('artist', 'name')
    .populate('album', 'name')
    .then((tracks) => {
      res.status(200).json(tracks);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};


exports.getTrackDetails = (req, res, next) => {
  const trackId = req.params.id;
  Track.findById(trackId)
  .populate('artist', 'name')
  .populate('album', 'name')
    .then((track) => {
      res.status(200).json(track);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};


exports.playTrack = async (req, res, next) => {
  const trackId = req.params.id;

  const track = await Track.findById(trackId);

  console.log(await Track.findById(trackId))

  const path = "musicDATA/" + await track.fileName;
  const stat = fs.statSync(await path);
  Track.findById(trackId)

    .then((track) => {
      res.status(200).json(path);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
  
}


exports.genreTrack =(req,res) =>{
  const text=req.params.id;
  Track.find({ genre : text  })
  .then((track) => {
    console.log(track) 
    res.status(200).json(track);
  })
  .catch((err) => {
    err.statusCode = 500;
    
  });
};
