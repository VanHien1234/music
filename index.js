const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");


/**
 * Middlewares
 */
const sourceAuth = require("./middlewares/sourceCheck");
/**
 * Routes
 */
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const musicRoutes = require("./routes/musicRoutes");

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/musicDATA", express.static(path.join(__dirname, "musicDATA")));
app.use("/s", express.static(path.join(__dirname, "artworks")));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/music",  musicRoutes);

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
    const PORT = process.env.PORT ||3000
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
