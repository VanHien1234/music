const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  playlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
 
});

module.exports = mongoose.model("User", UserSchema);