'use strict';



let Trip = require('./modules/trip');
let repository = require('./modules/repository');
let assert = require("./modules/utils").assert;

console.log("Starting main ... ");



(async () => {
    try {
        // clear all (for demo)
        let result = await repository.deleteAll();
        assert(result, "Result should be truthy");
        assert( !result.then, "fout in return");
        if(result) {
            console.log(`Removed all trips`);
        }
    }
    catch (err) {
        console.log("Unable to remove trips for reason: " + error);
    }

    // create three trips
    for(let i = 0;i<3;i++) {
        try {
            let trip = {
                start: new Date()
            };
            let createdTrip = await repository.create(trip);
            console.log("Created trip: >" + createdTrip.id + "<");
                assert(0 !== createdTrip.id, "The id of trip should not be zero");
                assert(1 <=  createdTrip.id)
                // trip.id = createdTrip.id+1;
        }
        catch(error) {
            assert(false);
            console.log("Error: >" + error + "<");
        }
    }
    // created three trips

    // find all
    try {
        let rows = await repository.findAll();
        let counter = 0;
        for (let trip of rows) {
            counter++;
            console.log(trip.id + ", " + trip.start + ", " + trip.end);
        }
        assert(counter > 0);

    }
    catch(error) {
        assert(false);
        console.log(error);
    }
    
    // find by id
    try {
        const target = 3;
        let trip = await repository.findById(target);
        if(trip) {
            console.log("Trip met id: " + trip.id + " heeft startmoment " + trip.start);
        }
        else {
            assert(false, "Geen tocht gevonden met id: "+target);
            console.log("Trip with id: "+target+" not found!");
        }
    }
    catch(error) {
        assert(false, "Fout / error ");
        console.log("Something went wrong since: " + error);
    }

    try {
        const victim = 3;
        let result = await repository.deleteById(victim);
        console.log("Trip with id: " + victim + " is" + (result ? "" : " not") + " deleted");
    }
    catch(error) {
        assert(false);
        console.log("Error again: " + error);
    }

    try {
        let result = await repository.endTrip(1); // 1 is there~~~???~?~?
        console.log("Last method: Updated with ending expected:true, actual:" + result);
        assert (result);// since there is no trip with id 1000
        
    }
    catch(error) {
        assert(false);
        console.log("Some error occured " + error);
    }

    try {
        let result = await repository.endTrip(1000);
        console.log("Last method: Updated with ending expected:false, actual:" + result);
        assert (!result);// since there is no trip with id 1000
       
    }
    catch(error) {
        assert(false);
        console.log("Some error occured " + error);
    }
        
    repository.stop();
})();

