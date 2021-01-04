const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
  },
  
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  image: {
    type: String,
  },
  createdate:{
    type: Date,
    default: mongoose.now
  }

});

ArtistSchema.methods.addAlbum = function (album) {
  this.albums.push(album);
  return this.save();
};

module.exports = mongoose.model("Artist", ArtistSchema);
