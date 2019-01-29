// mysql part
const mysql = require('mysql');
let Tocht = require('./tocht.js');

// create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodetestuser',
    password: 'nodetestpass2018Spectrum',
    database: 'oefentoets'
});
// this method is invoked AFTER the connection is made
// so just to mention "Connected!" (the connection is made above)

function query(sql, args) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Connected!');
    }
});

const tocht = {
    start: new Date()
};


query('insert into tocht set ?', [tocht]).then(result => {
       console.log(result.insertId);
});

query('SELECT * FROM tocht').then(rows => {
   for(row of rows) {
       console.log(row);
   }
});