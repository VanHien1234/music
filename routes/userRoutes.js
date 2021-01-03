const router = require("express").Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const auth = require("../middlewares/authCheck");
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
router.get("/profile", auth, userController.onViewProfile);
 

router.get("/play-list", auth, userController.viewPlaylist);

router.put("/play-list/:id", auth, userController.addToPlaylist);

router.delete("/play-list/:id", auth, userController.removePlaylist);

//kt dang nhap
router.use("/", (req, res, next) => {
  const newErr = Error("vui long dang nhap");
  newErr.statusCode = 403;
  next(newErr);
});

module.exports = router;
