var models = require('../models');
var express = require('express');
var db = require('../db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser'); 

var app = express();

app.use(parser.json()); // for parsing application/json
app.use(parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = req.body;
      models.messages.post(data, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(res);
    },
    post: function (req, res) {
      var data = req.body;
      models.users.post(data, res);
    }
  }
};

//express.Router().route/route.get(messages.get)

//Date.now(); (createdAt)
