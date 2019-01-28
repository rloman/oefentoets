'use strict';

let Tocht = require('./tocht.js');

let tochten = [];

function assert(assertion, message) {
    if (!assertion) {
        throw new Error(message);
    }
}

//user story 1
{
    let tocht1Start = new Date(2019, 0, 28, 9, 23, 0, 0);
    let tocht1 = new Tocht(tochten.length + 1, tocht1Start);
    tochten[tochten.length] = tocht1;

    console.log("Response user story 1: ");
    console.log(tocht1.id);
    console.log("-------------------")
}

// user story 2 // assume tocht.id = 1;
{
    let id = 1;
    let tocht = tochten[id - 1];    

    tocht.end = new Date();

    // calculate duration
    // duration in ms
    let timeDiff = Math.abs(tocht.end.getTime() - tocht.start.getTime());

    let hours = Math.floor(timeDiff / 1000 / 60 / 60);
    let hoursAsString = "00" + hours;
    hoursAsString = hoursAsString.substring(hoursAsString.length - 2, hoursAsString.length);

    let minutes = Math.floor(timeDiff / 1000 / 60 % 60);
    let minutesAsString = "00" + minutes;
    minutesAsString = minutesAsString.substring(minutesAsString.length - 2, minutesAsString.length);

    console.log("Response user story 2: ");

    console.log(`Enddate: ${tocht.end.getDate()}/${tocht.end.getMonth() + 1}/${tocht.end.getYear()}`);
    console.log(`Duration: ${hoursAsString}:${minutesAsString}`);

    console.log("-------------------")
}

// user story 4 : Inzicht in het aantal tochten

// add some more tochten
{
    {
        let tocht1Start = new Date(2019, 0, 28, 8, 23, 0, 0);
        let tocht1 = new Tocht(tochten.length + 1, tocht1Start);
        tochten[tochten.length] = tocht1;
    }
    {
        let tocht1Start = new Date(2019, 0, 28, 7, 23, 0, 0);
        let tocht1 = new Tocht(tochten.length + 1, tocht1Start);
        tochten[tochten.length] = tocht1;
    }



}
{
    console.log("Response user story 4: ");
    {
        let sum = 0;
        for (let tocht of tochten) {
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
        tochten[1].end = new Date();
        for (let tocht of tochten) {
            if (tocht.end) {
                sum++;
            }
        }
        assert(sum == 2);
        console.log("Aantal beeindigde tochten: "+sum);

        console.log("-------------------")
    }


}


// user story 5: Informatie over de duur van de tochten
let aantal = 0;
let sumTime = 0; // ms

for(let tocht of tochten.filter(e => e.end != null)) {
    aantal++;
    sumTime += tocht.duration(); //ms
    console.log(sumTime)
}
assert(aantal == 2);

console.log("Gemiddelde in minuten: "+Math.ceil(sumTime/1000/60/aantal));
