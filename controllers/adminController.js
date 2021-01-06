
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Track = require("../models/Track");
const Genre = require("../models/Genre");

//ARTIST


exports.newArtist = (req, res, next) => {
  const { name, genres, image } = req.body;
  const artist = new Artist({
    name: name,
    genres: genres,
    albums: [],
    image: image,
   
  });
  artist
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err);
    });
};
exports.removeArtist = (req,res,next) => {
  const artistId = req.params.id;
  Artist.findById(artistId)
  .then((artist)=>{
    artist.remove(artistId)
    console.log("xoa artist thanh conh")
    res.status(200).json("xoa artist thanh cong");
  })
  .catch((err) => {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });

};

exports.updateArtist = (res,req,next) =>{
  const artistId =  req.params.id;

   Artist.findByIdAndUpdate(artistId, req.body)
  
  .then(doc =>{
    if(!doc) {return res.status(404).end();}
    return res.status(200).json(doc);
  })
  .catch(err => next(err));
 
}


//ALBUM


exports.newAlbum = (req, res, next) => {
  const { artistId, name, genres, image } = req.body;
  console.log('artistID:',artistId);
  let currentArtist;
  Artist.findById(artistId)
    .then((artist) => {
      currentArtist = artist;
      console.log('Artist:',currentArtist);
      let album = new Album({
        name: name,
        genres: genres,
        image: image,
        tracks: [],
        artist: artist,
        
      });
      return album.save();
    })
    .then((album) => {
      return currentArtist.addAlbum(album);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};


//TRACK

/*
exports.newTrack = (req, res, next) => {
  const {
    albumId,
    name,
    genreId,
    artworkImage,
    fileName,
  } = req.body;
  let currentAlbum;
  let currentGenre;
  Album.findById(albumId)
  
    .then((album) => {
      currentAlbum = album;
      
      const track = new Track({
        name: name,
        
        album: album,
        artist: album.artist,
        artworkImage: artworkImage,
        fileName: fileName,
      });
      
      return track.save();
    })
 
    .then((track) => {
      return currentAlbum.addTrack(track);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};
*/
 //Genre 
 

 exports.newGenre = (req, res, next) => {
  const { name, image } = req.body;
  const genre = new Genre({
    name: name,
    albums: [],
    image: image,
   
  });
  genre
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err);
    });
};




exports.newTrack = (req, res, next) => {
  const {
    albumId,
    name,
    genre,
    artworkImage,
    fileName,
  } = req.body;
  let currentAlbum;
  Album.findById(albumId)
    .then((album) => {
      currentAlbum = album;
        const track = new Track({
          name: name,
          genre: genre,
          album: album,
          artist: album.artist,
          artworkImage: artworkImage,
          fileName: fileName,
        })
        return track.save();
        
    })
      
    .then((track) => {
      return currentAlbum.addTrack(track);
     
    })
    
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};


/*


Genre.findById(genreId)   
    .then((genre) =>{
      currentGenre = genre;
      const track = new Track({
        genre: genre,
      })
      return track.save();
    })


    const track = new Track({
      name: name,
      genre: genre,
      album: album,
      artist: album.artist,
      artworkImage: artworkImage,
      fileName: fileName,
      */