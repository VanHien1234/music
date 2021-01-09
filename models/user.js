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
  createdate:{
    type: Date,
    default: mongoose.now
  },
  role:{
    type : String,
    default : "User",
  }
 
});

UserSchema.methods.GroupAdmin = function(checkRole){
  if(checkRole === "ADMIN"){
      return true;
  } else {
      return false;

  };

};

module.exports = mongoose.model("User", UserSchema);
