'use strict';

let Tocht = require('./tocht.js');
let Kaartenbak = require('./kaartenbak');

let kaartenBak = new Kaartenbak();

// rloman refactor to module
function assert(assertion, message) {
    if (!assertion) {
        throw new Error(message);
    }
}

function assertEquals(expected, actual, message) {
    if(expected !== actual) {
        throw new Error("Expected: "+expected+", but was: "+actual+"::"+message);
    }
}

//user story 1
{
    let tocht1Start = new Date(2019, 0, 28, 9, 23, 0, 0);
    let tocht1 = kaartenBak.createTocht(tocht1Start);

    console.log("Response user story 1: ");
    console.log(tocht1.id);
    console.log("-------------------")
}

// user story 2 // assume tocht.id = 1;
{
    let id = 1;
    let tocht = kaartenBak.getTocht(id);

    tocht.end = new Date();

    console.log(`Enddate: ${tocht.end.getDate()}/${tocht.end.getMonth() + 1}/${tocht.end.getYear()}`);
    console.log("Duration: "+tocht.durationAsString());

    console.log("-------------------")
}

// user story 4 : Inzicht in het aantal tochten

// add some more tochten
{
    {
        let tocht1Start = new Date(2019, 0, 28, 8, 23, 0, 0);
        let tocht1 = kaartenBak.createTocht(tocht1Start);
    }
    {
        let tocht1Start = new Date(2019, 0, 28, 7, 23, 0, 0);
        let tocht1 = kaartenBak.createTocht(tocht1Start);
    }



}
{
    console.log("Response user story 4: ");
    {
        let sum = 0;
        // rloman refactor to iterator
        for (let tocht of kaartenBak.getTochten()) {
            if (tocht.end) {
                sum++;
            }
        }
        assert(sum == 1);
        console.log("Aantal beeindigde tochten: "+sum);
    }
    {
        // end a tocht
        let sum = 0;
        kaartenBak.getTocht(2).end = new Date();
        for (let tocht of kaartenBak.getTochten()) {
            if (tocht.end) {
                sum++;
            }
        }
        assertEquals(2, sum, "Should should be 2");
        console.log("Aantal beeindigde tochten: "+sum);

        console.log("-------------------")
    }


}


// user story 5: Informatie over de duur van de tochten
let aantal = 0;
let sumTime = 0; // ms

for(let tocht of kaartenBak.getTochten().filter(e => e.end != null)) {
    aantal++;
    sumTime += tocht.duration(); //ms
    console.log(sumTime)
}
assert(2, aantal);

console.log("Gemiddelde in minuten: "+Math.ceil(sumTime/1000/60/aantal));
