const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Track = require("../models/Track");

/**
 * Public Access
 */
exports.onSignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("loi xac thuc");
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }

  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        name: name,
        password: hashPassword,
        playlist: [],
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({ msg: "dang ky thanh cong!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.onForgotPassword = (req, res, next) => {};

exports.onLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("loi xac thuc");
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }

  let email = req.body.email;
  let password = req.body.password;
  let loginUser = null;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("nguoi dung khong ton tai");
        err.statusCode = 401;
        throw err;
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        const err = new Error(" sai Passwod!");
        err.statusCode = 401;
        throw err;
      }

      const token = jwt.sign(
        { userId: loginUser._id.toString(), email: loginUser.email },
       
      );

      res.status(200).json(token);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


 // Private Access
 

exports.onViewProfile = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
 
    .select("-password")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewPlaylist = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    
    .then((movies) => {
      res.json(movies.playlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addToPlaylist = (req, res, next) => {
  const userId = req.userId;
  const trackId = req.params.id;
  let currentUser;
  User.findById(userId)
   
    .then((user) => {
      currentUser = user;
      return Track.findById(trackId);
    })
    .then((track) => {
      currentUser.playlist.push(track);
      return currentUser.save();
    })
    .then((result) => {
      res.status(200).json(result.playlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.removePlaylist = (req, res, next) => {
  const userId = req.userId;
  const trackId = req.params.id;
  User.findById(userId)
   
    .then((user) => {
      user.playlist.remove(trackId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json(result.playlist);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
