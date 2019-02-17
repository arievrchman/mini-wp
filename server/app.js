require('dotenv').config();
// depedencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/index');

// create express instance
const app = express();

// connect to database
mongoose.connect('mongodb://localhost:27017/mini-wp', { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(require('cors')());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port', port);
});
