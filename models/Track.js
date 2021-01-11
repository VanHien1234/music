const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: false,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  genre:{
    type: String,

  },
  image: {
    type: String,
  },
  fileName: {
    type: String,
  },
  createdate:{
    type: Date,
    default: mongoose.now
  }
});

module.exports = mongoose.model("Track", SongSchema);
