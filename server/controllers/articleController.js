const Article = require('../models/articleModel');

module.exports = {
  getAllArticle: function (req, res) {
    Article
      .find({}).populate('author', '-password').sort('-created_at')
      .then((data) => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  myArticle: function (req, res) {
    Article
      .find({ author: req.auth_user._id }).sort('-created_at')
      .populate('author', '-password')
      .then((data) => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  createNewArticle: function (req, res) {
    Article
      .create({
        author: req.auth_user._id,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
      })
      .then((data) => {
        res.status(201).json({
          result: {
            data,
            message: 'Successfully created new article'
          },
          error: null
        })
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  updateArticle: function (req, res) {
    Article
      .findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          content: req.body.content
        })
      .then((data) => {
        res.status(200).json({
          result: {
            data,
            message: 'Successfully update article'
          },
          error: null,
        })
      }).catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  },
  deleteArticle: function (req, res) {
    Article
      .findByIdAndDelete(req.params.id)
      .then((data) => {
        res.status(200).json({
          result: {
            data,
            message: 'Successfully delete article'
          },
          error: null,
        })
      })
      .catch((err) => {
        res.status(500).json({
          result: null,
          error: err
        });
      });
  }
};
