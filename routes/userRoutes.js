const router = require("express").Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const {login,admin} = require("../middlewares/authCheck");
const User = require("../models/user");


 // User Access
 
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("nhap ID,email dung yeu cau")
      .custom((value, req) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email da ton tai");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password toi thieu 6 ky tu"),
  ],
  userController.onSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("nhap ID,email dung yeu cau")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("nhap password hop le!"),
  ],
  userController.onLogin
);

router.post("/forgot", userController.onForgotPassword);

//View Profiles
router.get("/profile", login, userController.onViewProfile);
 

router.get("/play-list", login, userController.viewPlaylist);

router.put("/play-list/:id", login, userController.addToPlaylist);

router.delete("/play-list/:id", login, userController.removePlaylist);

//kt dang nhap
router.use("/", (req, res, next) => {
  const newErr = Error("vui long dang nhap de su dung tai nguyen ");
  newErr.statusCode = 403;
 // next(newErr);
});

module.exports = router;
