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
        assert(!result.then, "fout in return");
        if (result) {
            console.log(`Removed all tochten`);
        }
    }
    catch (err) {
        console.log("Unable to remove tochts for reason: " + error);
    }

    let tocht = {
        start: new Date()
    };
    
    kaartenBak.demoray(tocht);
    let tochtCreated = await kaartenBak.demoray2(tocht);
    assert(tochtCreated);
    assert(tochtCreated.id > 0)
    let allRows = await kaartenBak.demoray3List();
    for(let tocht of allRows) {
        console.log(tocht.id)
        assert(tocht.id > 0);
    }
    kaartenBak.stop();
})();

