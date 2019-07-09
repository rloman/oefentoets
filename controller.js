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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let service = require("./modules/service");

// this is to enable getting from 'api/users' using the callback function
app.get('/api/trips', async function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  let users = await service.findAll();
  res.end(JSON.stringify(users));
});

// this is to enable http://localhost:8081/api/users/3 or something
// look that the 'id' is read out below
app.get('/api/trips/:id', async function (req, res) {

  let id = +req.params.id

  let trip = await service.findById(id);
  // OK we found a user
  if (trip) {
    res.setHeader('Content-Type', 'application/json')
    // response end with a string of the found user
    res.end(JSON.stringify(trip));
  } else {
    // error, we did NOT find a user
    res.setHeader('Content-Type', 'application/json')

    // so render the common 404 (Not found)
    res.status(404).end();
  }
});

// post

// this is to enable posting to 'api/users' using the callback function
app.post('/api/trips', async function(req, res) {

  // this is to read the big string from the body to a user
 // that process is called 'parsing'
 //(using the body-parser module above)
  let trip = req.body;

  // in this function (the POST callback) execute this query
  // the user is the parsed user
  // the err is a (potential) error
  // the result is the result of the MYSQL insertion (THAT IS NOT A JSON OBJECT BUT A TECHNICAL MYSQL OBJECT)

  let savedTrip = await service.save(trip);
  if (savedTrip) {
    res.setHeader('Content-Type', 'application/json')
    // response end with a string of the found user
    res.status(201).end(JSON.stringify(savedTrip)); // rloman dit nog ophalen en test via select ...
  } else {
    // error, we did NOT find a user
    res.setHeader('Content-Type', 'application/json')

    // so render the common 404 (Not found)
    res.status(404).end();
  }
});



// and finally ... run it :-)
// get the server from the app which runs on port 8081
let server = app.listen(8081, function () {

  console.log("Example app listening at http://%s:%s", server.address().address, server.address().port)
});