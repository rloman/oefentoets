let mysql = require('mysql');

module.exports = class Kaartenbak {

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

    stop() {
        this.connection.end(function() {
            console.log("Ending the connection ... Bye ... ");
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => { // be aware: the mysql connect.query returns error first and the rows
                if (!err) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    insert(tocht) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        return new Promise((resolve, reject)  => {
            this.connection.query("insert into tocht set ?", [tocht], (err, result) => {
                if (!err) {
                    tocht.id = result.insertId;
                    resolve(tocht);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    createTocht(start) {
        // let tocht = insert(start);
        let tocht = {
            start: start
        }
        return this.insert(tocht);
    }

    insertAlternate(start) {

        const tocht = {
            start: start
        };

        // use an array function here instead of function() since else this.connection would be undefined
        // better said: an arrow function has lexical scope. here, this is the kaartenbak (hence this.connection is reachable)
        return new Promise((resolve, reject) => {
                this.connection.query("insert into tocht set ?", [tocht], (error, result) => {
                    if(!error) {
                        console.log("in my thing rloman");
                        tocht.id = result.insertId;

                        resolve(tocht);
                    }
                    else {
                        reject(err);
                    }
                })
        });
    }

    getTochten() {
        // return this.query("select * from tocht");

        return new Promise((resolve, reject) => {
            this.connection.query("select * from tocht", function(error, rows) {
                if(!error) {
                    resolve(rows);
                }
                else {
                    reject(error);
                }
                

            })
        });
    }

    getTocht(id) { // be aware: returns a Promise
        return this.query("select * from tocht where id='?'", id);
    }

    deleteTochtById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("delete from tocht where id='?'", id, function(error, result) {
                if(!error) {
                    resolve(result.affectedRows === 1);
                }
                else {
                    reject(false);
                }
            });
        });
    }

    beeindigTocht(id) {
        let end = new Date();

        return new Promise((resolve, reject) => {
            this.connection.query("update tocht set end=? where id=?", [end, id], (error, result) => {
                if(!error) {
                    resolve(result.affectedRows === 1);
                }
                else {
                    reject(false);
                }
            })
        });
    }

    removeAll() {
        return new Promise((resolve, reject) => {
            this.connection.query("truncate table tocht", (error, result) => {
                if(!error) {
                    this.connection.query('ALTER TABLE tocht AUTO_INCREMENT = 0', (error, aResult) => {
                        if(!error) {
                            resolve(result.affectedRows);
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                else {
                    
                }
            })
        });
    }
}