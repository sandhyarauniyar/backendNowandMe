const db = require("../models");
const config = require("../config/dbConfig.js");
const User = db.models.users;
const dotenv = require('dotenv');
const Op = db.Sequelize.Op;
console.log(dotenv);

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Signup for the first time, token is generated
exports.signup = async (req, res) => {
  // Save User to Database
  console.log("inside signup");
  let token = jwt.sign({ id: req.body.user }, process.env.secret_key, {
    expiresIn: 86400 // 24 hours
  });

  try {
    const user = await User.create({
      user: req.body.user,
      password: bcrypt.hashSync(req.body.password, 8),
      accessToken: token
    });

    console.log("user created");
    console.log(user);
    res.json(user);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
};


// signin after signup, checking if user is present, generated new access token
exports.signin = async (req, res) => {
  User.findOne({
    where: {
      user: req.body.user
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.user }, process.env.secret_key, {
        expiresIn: 86400 // 24 hours
      });


      try {
        const oldUser = await User.update(
          { accessToken: token },
          { where: { user: req.body.user } }
        );

        console.log("user created");
        console.log(oldUser);
      }
      catch (err) {
        res.status(500).send({ message: err.message });
      };

      res.status(200).send({
        id: user.userId,
        user: user.user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
