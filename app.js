'use strict';

let Tocht = require('./tocht');
let Kaartenbak = require('./kaartenbak');

console.log("Starting main ... ");

let kaartenBak = new Kaartenbak();

let tocht = {
    start: new Date()
};
console.log(tocht);

kaartenBak.insert(tocht);


kaartenBak.query('insert into tocht set ?', [tocht]).then(result => {
    console.log(result.insertId);
});


kaartenBak.insertAlternate(new Date());

kaartenBak.createTocht(new Date());

let promise = kaartenBak.getTochten();

promise.then(function(rows) {

    for(let row of rows) {
        console.log(row.id+", "+row.start);
    }
});

// kan dus ook zo
kaartenBak.getTochten().then(rows => {
    for(let tocht of rows) {
        console.log(tocht.id+", "+tocht.start+", "+tocht.end);
    }
});

kaartenBak.getTocht(3).then(rows => {
    if(rows) {
        let tocht = rows[0];
        console.log("Tocht met id: "+tocht.id+" heeft startmoment "+tocht.start);
    }
});

kaartenBak.deleteTochtById(159);


let promise1 = kaartenBak.beeindigTocht(248);

promise1.then(function(result) {
    console.log("Updated with ending "+result.affectedRows);
}) ;