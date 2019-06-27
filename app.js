'use strict';



let Tocht = require('./modules/tocht');
let kaartenBak = require('./modules/repository');
let assert = require("./modules/utils").assert;

console.log("Starting main ... ");



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

    let tocht = {
        start: new Date()
    };
    
    try {
        let createdTocht = await kaartenBak.insert(tocht);
        console.log("Created tocht: >" + createdTocht.id + "<");
            assert(0 !== createdTocht.id, "The id of tocht should not be zero");
            assert(1 <=  createdTocht.id)
            tocht.id = createdTocht.id+1;
    }
    catch(error) {
        assert(false);
        console.log("Error: >" + error + "<");
    }
   

    try {
        let result = await kaartenBak.query('insert into tocht set ?', [tocht]);

        assert(result);
        console.log("Inserted tocht with id:" + result.insertId);
        assert(result && result.insertId > 0);
    }

    catch(error) {
        console.log("Error: " + error);
        assert(false);
    }
    
    try {
        let createdTocht = await kaartenBak.insertAlternate(new Date());
        assert(true);
        console.log(createdTocht.id);
    }
    catch(error) {
        assert(false);
        console.log("Foutje bedankt:" + error);
    }
       
    try {
        let tocht = await kaartenBak.createTocht(new Date());
        assert(0 !== tocht.id);
        console.log("Created a tocht with id:" + tocht.id);
    }
    catch(error) {
        assert(false);
        console.log(error);
    }

    try {
        let rows = await kaartenBak.getTochten();
        for (let row of rows) {
            console.log(row.id + ", " + row.start);
        }
    }
    catch(error) {
        assert(false);
        console.log(error);
    }

    try {
        let rows = await kaartenBak.getTochten();
        let counter = 0;
        for (let tocht of rows) {
            counter++;
            console.log(tocht.id + ", " + tocht.start + ", " + tocht.end);
        }
        assert(counter > 0);

    }
    catch(error) {
        assert(false);
        console.log(error);
    }
    
    const victim = 3;

    try {
        let tocht = await kaartenBak.getTocht(victim);
        if(tocht) {
            console.log("Tocht met id: " + tocht.id + " heeft startmoment " + tocht.start);
        }
        else {
            assert(false, "Geen toch gevonden met id: "+victim);
            console.log("Tocht with id: "+victim+" not found!");
        }
    }
    catch(error) {
        assert(false, "Fout / error ");
        console.log("Something went wrong since: " + error);
    }

    try {
        let result = await kaartenBak.deleteTochtById(victim);
        console.log("Tocht with id: " + victim + " is" + (result ? "" : " not") + " deleted");
    }
    catch(error) {
        assert(false);
        console.log("Error again: " + error);
    }

    try {
        let result = await kaartenBak.beeindigTocht(1); // 1 is there~~~???~?~?
        console.log("Last method: Updated with ending expected:true, actual:" + result);
        assert (result);// since there is no tocht with id 1000
        
    }
    catch(error) {
        assert(false);
        console.log("Some error occured " + error);
    }

    try {
        let result = await kaartenBak.beeindigTocht(1000);
        console.log("Last method: Updated with ending expected:false, actual:" + result);
        assert (!result);// since there is no tocht with id 1000
       
    }
    catch(error) {
        assert(false);
        console.log("Some error occured " + error);
    }
        
    kaartenBak.stop();
})();

