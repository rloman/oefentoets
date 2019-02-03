'use strict';

let Tocht = require('./modules/tocht');
let Kaartenbak = require('./modules/kaartenbak');

console.log("Starting main ... ");

let kaartenBak = new Kaartenbak();

let tocht = {
    start: new Date()
};

let createdTochtPromise = kaartenBak.insert(tocht);


createdTochtPromise.then(function(createdTocht) {
    console.log("Created tocht: >" + createdTocht.id + "<");
}, function(error) {
    console.log("Error: >"+error+"<");
});

// process.exit(0); // warning: tricky since this will stop the PROGRAM BEFORE THE PROMISE IS DONE


kaartenBak.query('insert into tocht set ?', [tocht]).then(result => {
    console.log(result.insertId);
});


console.log(kaartenBak.insertAlternate(new Date())); // IS undefined hence fix

kaartenBak.createTocht(new Date());

let promise = kaartenBak.getTochten();

promise.then(function (rows) {

    for (let row of rows) {
        console.log(row.id + ", " + row.start);
    }
});

// kan dus ook zo
kaartenBak.getTochten().then(rows => {
    for (let tocht of rows) {
        console.log(tocht.id + ", " + tocht.start + ", " + tocht.end);
    }
});

kaartenBak.getTocht(3).then(rows => {
    if (rows) {
        let tocht = rows[0];
        console.log("Tocht met id: " + tocht.id + " heeft startmoment " + tocht.start);
    }
});

kaartenBak.deleteTochtById(159);


let promise1 = kaartenBak.beeindigTocht(248);

promise1.then(function (result) {
    console.log("Updated with ending " + result.affectedRows);
});