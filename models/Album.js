const mongoose = require("mongoose");
const { schema } = require("./Artist");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
  },
  image: {
    type: String,
  },
  tracks: [{
       
    type : mongoose.Schema.Types.ObjectId,
    ref: "Track",
 
  }
 
  ],
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    
  },
  createdate:{
    type: Date,
    default: mongoose.now
  }
});

AlbumSchema.methods.addTrack = function (track) {
  this.tracks.push(track);
  return this.save();
};

module.exports = mongoose.model("Album", AlbumSchema);
