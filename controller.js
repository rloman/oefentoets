"use strict";

let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let service = require("./modules/service");

app.get('/api/trips', async function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  let users = await service.findAll();
  res.end(JSON.stringify(users));
});

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

app.post('/api/trips', async function(req, res) {

  let trip = req.body;

  let savedTrip = await service.save(trip);
  if (savedTrip) {
    res.setHeader('Content-Type', 'application/json')
    // response end with a string of the found user
    res.status(201).end(JSON.stringify(savedTrip));
  } else {
    // error, we did NOT find a user
    res.setHeader('Content-Type', 'application/json')

    // so render the common 404 (Not found)
    res.status(404).end();
  }
});

// put
app.put('/api/trips/:id', async function(req, res) {

  // First read id from params
  let id = +req.params.id
  let inputTrip = req.body;

  let updatedUser = await service.updateById(id, inputTrip);

  if (updatedUser) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(updatedUser));
  } else {
    res.setHeader('Content-Type', 'application/json')
    console.log("Not found!!!");
    res.status(404).end();
  }
});



// and finally ... run it :-)
// get the server from the app which runs on port 8081
let server = app.listen(8081, function () {
  console.log("Example app listening at http://%s:%s", server.address().address, server.address().port)
});