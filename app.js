let Tocht = require('./tocht.js');

let tochten = [];

//user story 1
{
    let tocht1Start = new Date(2019, 0, 28, 9, 23, 0,0);
    let tocht1 = new Tocht(tochten.length+1, tocht1Start);
    tochten[tochten.length+1] = tocht1;
    
    console.log(tocht1.id);
}

// user story 2 // assume tocht.id = 1;
{
    let tocht = tochten[1];

    tocht.end = new Date();

    console.log(tocht.start);
    console.log(tocht.end);

    // calculate duration
    // duration in ms
    let timeDiff = Math.abs(tocht.end.getTime() - tocht.start.getTime());

    console.log(timeDiff);

    let hours = Math.floor(timeDiff / 1000 / 60 / 60 );

    let minutes = Math.floor(timeDiff / 1000 / 60  % 60);

    console.log(hours+":"+minutes);

    let hoursAsString = "00"+hours;
    hoursAsString = hoursAsString.substring(hoursAsString.length-2, hoursAsString.length);
    let minutesAsString = "00"+minutes;
    minutesAsString = minutesAsString.substring(minutesAsString.length-2, minutesAsString.length);

    console.log("Enddate: "+tocht.end.getDate()+"/"+tocht.end.getMonth()+1+"/"+tocht.end.getYear());
    console.log("Duration: "+hoursAsString+":"+minutesAsString);

}


