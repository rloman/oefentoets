"use strict";

// import express module (webserver)
let express = require('express');

// use the express module in the app object
let app = express();

// import body-parser module here
let bodyParser = require('body-parser');

// say to the app (express instance) that he might sometimes render
// the body of a POST/PUT from JSON to an Object
app.use(bodyParser.json());


// for now this is to say that everyone can reach this webserver
// from everywhere
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let service = require("./modules/service");

// this is to enable getting from 'api/users' using the callback function
app.get('/api/users', function(req, res) {

    res.setHeader('Content-Type', 'application/json');
  
    connection.query('SELECT * FROM users', (err, users) => {
      if (!err) {
        res.end(JSON.stringify(users));
      } else {
        throw err;
      }
    });
  });