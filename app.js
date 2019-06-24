'use strict';



let Tocht = require('./modules/tocht');
let kaartenBak = require('./modules/kaartenbak');
let assert = require("./modules/utils").assert;

console.log("Starting main ... ");

/*
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    // ...
  })();

  */
// clear all (for demo)
(async () => {
    try {
        let result = await kaartenBak.removeAll();
        assert(result, "Result should be truthy");
        assert( !result.then, "fout in return");
        if(result) {
            console.log(`Removed all tochten`);
        }
    }
    catch (err) {
        console.log("Unable to remove tochts for reason: " + error);
    }

    process.exit(); // rloman hier verder!!!
    
})();

let tocht = {
    start: new Date()
};

let createdTochtPromise = kaartenBak.insert(tocht);
assert(createdTochtPromise.then);


// be aware that here createdTocht and error are parameters of arrow functions
createdTochtPromise.then(createdTocht => {
    console.log("Created tocht: >" + createdTocht.id + "<");
    assert(0 !== tocht.id, "The id of tocht should not be zero");
}, error => {
    console.log("Error: >" + error + "<");
});


kaartenBak.query('insert into tocht set ?', [tocht]).then(result => {
    assert(true);
    console.log("Inserted tocht with id:" + result.insertId);
}, error => {
    assert(false);
    console.log("Error: " + error);
});


kaartenBak.insertAlternate(new Date()).then(function (createdTocht) {
    assert(true);
    console.log(createdTocht.id);
}, function (error) {
    assert(false);
    console.log("Foutje bedankt:" + error);
})

kaartenBak.createTocht(new Date()).then(function (tocht) {
    assert(0 !== tocht.id);
    console.log("Created a tocht with id:" + tocht.id);
}, function (error) {
    asssert(false);
    console.log(error);
});

let promise = kaartenBak.getTochten();

assert(promise.then, "Promise (promise) should be promise");

promise.then(function (rows) {
    assert(true);
    for (let row of rows) {
        console.log(row.id + ", " + row.start);
    }
}, error =>  {
    assert(false);
    console.log(error);
});

// again be aware ... after then there follow TWO functions
kaartenBak.getTochten().then(rows => {
  
    let counter = 0;
    for (let tocht of rows) {
        assert(true);
        counter++;
        console.log(tocht.id + ", " + tocht.start + ", " + tocht.end);
    }
    assert(counter > 0);
}, error => {
    console.log(error);
});

const victim = 3;

kaartenBak.getTocht(victim).then(tocht => {
    if(tocht) {
        console.log("Tocht met id: " + tocht.id + " heeft startmoment " + tocht.start);
    }
    else {
        assert(false, "Geen toch gevonden met id: "+victim);
        console.log("Tocht with id: "+victim+" not found!");
    }
}, error => {
    assert(false, "Fout / error ");
    console.log("Something went wrong since: " + error);
});

kaartenBak.deleteTochtById(victim).then((result) => { // result his brackets might be omitted, but are still valid
    console.log("Tocht with id: " + victim + " is" + (result ? "" : " not") + " deleted");
}, error => {
    assert(false);
    console.log("Error again: " + error);
});


kaartenBak.beeindigTocht(1000).then(result => {
    console.log("Last method: Updated with ending " + result);
}, error => {
    assert(false);
    console.log("Some error occured " + error);
});

kaartenBak.stop();