'use strict';

let Tocht = require('./tocht.js');
let mysql = require('mysql');

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

    insert(tocht) {
        this.connection.query("insert into tocht set ?", [tocht], (err, result) => {
                console.log(result.insertId);
        })
    }

}

// main

let kaartenBak = new Kaartenbak();

kaartenBak.query("select * from tocht").then(rows => {
    for(let row of rows) {
        console.log(row.id+", "+row.start);
    }
});

let tocht = {
    start: new Date(),
    end: new Date()
}
kaartenBak.insert(tocht);

kaartenBak.query("select * from tocht").then(rows => {
    for(let row of rows) {
        console.log(row.id+", "+row.start);
    }
});
