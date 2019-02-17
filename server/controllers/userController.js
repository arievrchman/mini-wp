const User = require('../models/userModel');
const { decrypt } = require('../helpers/encrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: function (req, res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then((user) => {
        res.status(201).json({
          result: {
            user,
            message: 'Successfully register account'
          },
          error: null
        });
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  signin: function (req, res) {
    User
      .findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          const isValid = decrypt(req.body.password, data.password);
          if (isValid) {
            const access_token = jwt.sign({ data }, process.env.SECRET);
            res.status(200).json({
              result: {
                access_token,
                message: 'Successfully logged in'
              }
            })
          } else {
            res.status(404).json({
              result: null,
              error: {
                message: 'Wrong Password'
              }
            });
          }
        } else {
          res.status(404).json({
            result: null,
            error: {
              message: 'Email is not registered'
            }
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  checkUser: function (req, res) {
    User
      .findById(req.auth_user._id).select('-password')
      .then((data) => {
        if (data) {
          res.status(200).json({
            result: data,
            error: null
          });
        } else {
          res.status(404).json({
            result: null,
            error: {
              message: 'You must login first'
            }
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        })
      });
  }
};
