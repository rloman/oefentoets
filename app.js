'use strict';

let Tocht = require('./tocht.js');
let mysql = require('mysql');

// rloman refactor to module
class Kaartenbak {

    constructor() {
        // create a MySQL connection
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'nodetestuser',
            password: 'nodetestpass2018Spectrum',
            database: 'oefentoets'
        });

        this.connection.connect(function (err) {
            if (err) {
                throw err;
            } else {
                console.log('Connected!');
            }
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    insert(tocht) { // might refactor this to return the Promise and get the id als the key
        this.connection.query("insert into tocht set ?", [tocht], (err, result) => {
                console.log(result.insertId);
        })
    }

    createTocht(start) {
        // let tocht = insert(start);
        let tocht = {
            start: start
        }
       this.insert(tocht);
    }

    insertAlternate(start) {

        const tocht = {
            start: start
        };
        console.log(tocht);
        console.log("About to insert ... ");
        this.connection.query('INSERT INTO tocht SET ?', [tocht], (err, result)  => {
            console.log("In the query");
            if (!err) {
                console.log("This rocks");
                console.log('Last insert ID:', result.insertId);
                tocht.id = result.insertId;

                return tocht;

            }
            else {
                console.log("This sucks");
                throw err;
            }
        });
    }

    getTochten() {
        return this.query("select * from tocht");
    }

    getTocht(id) { // be aware: returns a Promise
        return this.query("select * from tocht where id='?'", id);
    }

    deleteTochtById(id) {
        this.query("delete from tocht where id='?'", id).then(result => {
           console.log("There are "+result.affectedRows+" rows deleted!");
        });
    }

    beeindigTocht(id) {
        let end = new Date();
         return this.query("update tocht set end=? where id=?", [end, id]);
    }
}

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

console.log(promise1);

promise1.then(function(result) {
    console.log("Updated with ending "+result.affectedRows);
}) ;