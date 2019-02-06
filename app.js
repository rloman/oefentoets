'use strict';

let Tocht = require('./modules/tocht');
let Kaartenbak = require('./modules/kaartenbak');

console.log("Starting main ... ");

let kaartenBak = new Kaartenbak();

let tocht = {
    start: new Date()
};

let createdTochtPromise = kaartenBak.insert(tocht);


// be aware that here createdTocht and error are parameters of arrow functions
createdTochtPromise.then(createdTocht => {
    console.log("Created tocht: >" + createdTocht.id + "<");
}, error => {
    console.log("Error: >" + error + "<");
});


kaartenBak.query('insert into tocht set ?', [tocht]).then(result => {
    console.log("Inserted tocht with id:" + result.insertId);
}, error => {
    console.log("Error: " + error);
});


kaartenBak.insertAlternate(new Date()).then(function (createdTocht) {
    console.log(createdTocht.id);
}, function (error) {
    console.log("Foutje bedankt:" + error);
})

kaartenBak.createTocht(new Date()).then(function (tocht) {
    console.log("Created a tocht with id:" + tocht.id);
}, function (error) {
    console.log(error);
});

let promise = kaartenBak.getTochten();

promise.then(function (rows) {
    for (let row of rows) {
        console.log(row.id + ", " + row.start);
    }
}, error => console.log(error));

// again be aware ... after then there follow TWO functions
kaartenBak.getTochten().then(rows => {
    for (let tocht of rows) {
        console.log(tocht.id + ", " + tocht.start + ", " + tocht.end);
    }
}, error => console.log(error));

kaartenBak.getTocht(501).then(rows => {
    let tocht = rows[0];
    console.log("Tocht met id: " + tocht.id + " heeft startmoment " + tocht.start);
}, error => {
    console.log("Something went wrong" + error);
});

let victim = 451;
kaartenBak.deleteTochtById(victim).then((result) => { // result his brackets might be omitted, but are still valid
        console.log("Tocht with id: " + victim + " is" + (result ? "" : " not") + " deleted");
}, error => {
    console.log("Error again: "+error);
});


kaartenBak.beeindigTocht(1000).then(result => {
        console.log("Last method: Updated with ending " + result);
}, error => {
    console.log("Some error occured " + error);
});

kaartenBak.stop();