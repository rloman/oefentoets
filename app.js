"use strict";

let express = require('express');
let controller = express();

let bodyParser = require('body-parser');

let service = require("./modules/service");

controller.use(bodyParser.json());


controller.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


controller.get('/api/trips', async function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  let users = await service.findAll();
  res.end(JSON.stringify(users));
});

controller.get('/api/trips/:id', async function (req, res) {

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

controller.post('/api/trips', async function (req, res) {

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
controller.put('/api/trips/:id', async function (req, res) {

  // First read id from params
  let id = +req.params.id
  let inputTrip = req.body;

  let updatedTrp = await service.updateById(id, inputTrip);

  if (updatedTrp) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(updatedTrp));
  } else {
    res.setHeader('Content-Type', 'application/json')
    console.log("Not found!!!");
    res.status(404).end();
  }
});


controller.delete('/api/trips/truncate', async function (req, res) {

  let result = await service.deleteAll();

  if (result) {
    res.status(204).end();// true hence the deletion succeeded
  }
  else {
    res.status(404).end();// false hence the deletion succeeded (204 or 404???)
  }
});

controller.delete('/api/trips/:id', async function (req, res) {
  let id = +req.params.id;

  let result = await service.deleteById(id);

  if (result) {
    res.status(204).end();// true hence the deletion succeeded
  }
  else {
    res.status(404).end();// false hence the deletion succeeded (204 or 404???)
  }
});

// and finally ... run it :-)
// get the server from the app which runs on port 8081
let server = controller.listen(8081, function () {
  console.log("Example app listening at http://%s:%s", server.address().address, server.address().port)
});