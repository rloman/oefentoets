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

kaartenBak.query('insert into tocht set ?', [tocht]).then(result => {
    console.log("Inserted tocht with id:"+result.insertId);

});


kaartenBak.insertAlternate(new Date()).then(function(createdTocht, error) {
    console.log(createdTocht.id);
   
})

kaartenBak.createTocht(new Date()).then(function(tocht, error) {
    if(!error) {
        console.log("Created a tocht with id:"+tocht.id);
    }
});

let promise = kaartenBak.getTochten();

promise.then(function (rows, error) {

    if(!error) {
        for (let row of rows) {
            console.log(row.id + ", " + row.start);
        }
    }
});

// kan dus ook zo
kaartenBak.getTochten().then((rows, error) => {
    if(!error) {
        for (let tocht of rows) {
            console.log(tocht.id + ", " + tocht.start + ", " + tocht.end);
        }
    }
   
});

kaartenBak.getTocht(501).then((rows, error) => {
    if (!error) {
        let tocht = rows[0];
        console.log("Tocht met id: " + tocht.id + " heeft startmoment " + tocht.start);
    }
});

let victim = 451;
kaartenBak.deleteTochtById(victim).then((result, error) => {
    if(!error) {
        console.log("Tocht with id: "+victim+" is"+(result ? "" : " not") +" deleted");
    }
});


let promise1 = kaartenBak.beeindigTocht(1000);

promise1.then((result, error) => {
    if(!error) {
        console.log("Last method: Updated with ending " + result);
    }
    else {
        console.log("Some error occured "+error);
    }
    
});

kaartenBak.stop();