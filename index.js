const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

var mongoose = require("mongoose");

  //Routes
 
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const musicRoutes = require("./routes/musicRoutes");
const Artist = require("./models/Artist");

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/musicDATA", express.static(path.join(__dirname, "musicDATA")));
app.use("/imageDATA", express.static(path.join(__dirname, "imageDATA")));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/music",  musicRoutes);
app.get('/search', async (res,req) => 
{
  let searchResult = await Artist.find({ "name": { $regex: req.query.name , $options: "i" } })
  res.status(200).json(searchResult)
});
  /*const keyword = req.body
  console.log(keyword)
  let searchResult = await Artist.find({ "name": { $regex: keyword , $options: "i" } })
  res.status(200).json(searchResult)
  
  var q = req.query.q
  console.log(q)
  Artist.find({
    name :{
      $regex : new RegExp(q)
    } 
  }, {
    _id: 0,
    __v: 0
  }, function(err,data){
    res.json(data);
  }).limit(10);
  
  
  
  
  */


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb+srv://hien:1234@cluster0.hk9dj.mongodb.net/TEST?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const PORT = 3000
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
var db = mongoose.connection;
db.on('error', function(err) {
  if (err) console.log(err)
});


db.once('open', function() {
  console.log("Kết nối DB thành công !");
});  
