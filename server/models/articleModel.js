const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: new Date() },
  featured_image: String
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
