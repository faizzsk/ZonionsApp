const express = require("express");
const { promisify } = require("util");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/admin");
const db = require("../config/db");
const { decode } = require("punycode");
const { log } = require("console");
const key = db.secretOrKey;

// -----------------LOGIN---------------------------
exports.Login = (req, res) => {
  //router.post("/login", (req, res) => {

  const email = req.body.email;
  const name2 = req.body.name;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      // Check password

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched

          // Create JWT Payload
          const payload = user.id;
          //name: user.name
          //console.log(typeof(user.id));
          // Sign token
          jwt.sign(
            payload,
            key,
            // {
            //   expiresIn: 31556926, // 1 year in seconds
            // },
            (err, token) => {
              console.log(err, token);
              let tokenn = {
                success: true,
                token: token,
                email: email,
                name: user.name,
              };
              res.cookie("token", tokenn, { httpOnly: true });
              res.json(tokenn);
            }
          );
          //  console.log(emailid);
          console.log(name2);
        } else {
          console.log("incorrect");

          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
          //console.log("incorrect");
        }
      });
    });
};

//}

exports.Register = (req, res) => {
  // Check validation
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,

        password: req.body.password,
      });
      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
  //  });
};

// -------get login user-------------

exports.getUser = (req, res) => {
  //  router.get("/users", (req,res)=>{
  var user;
  if (typeof window !== "undefined") {
    user = localStorage.getItem(JSON.stringify("user"));
  }
  console.log("", user);
  User.findOne({ email: user }, (err, doc) => {
    if (err) throw err;

    //console.log("", doc);
    res.send(doc);
  });
};

//-------------Verify Decoding of token - --------

exports.Verify = async (req, res, next) => {
  //  let token = ("token")
  console.log("this is Cookie=>", req.cookies.token);

  let token = req.cookies.token;

  if (!token) {
    console.log("Forbidden");
  } else {
    console.log("u can accsess");
    try {
      const decoded = await promisify(jwt.verify)(token.token, key);
      console.log(decoded);

      next();
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  }

  console.log("----------In verify------");
};
