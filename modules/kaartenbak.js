let mysql = require('mysql');
const util = require("util");
const assert = require("./utils.js").assert;

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

        this.connection.query = util.promisify(this.connection.query) // Magic happens here.
    }


    // normal 
    demoray(tocht) {
        this.connection.query("insert into tocht set ?", [tocht], function (err, result) {
            assert(result);
            assert(result.insertId);
            let id = result.insertId;
            if (!err) {
                tocht.id = result.insertId;
                id = result.insertId;
                console.log(id);

                return id;
            }
            else {
                throw err;
            }
        });
    }

    // new using async await and getting a (simulated) synchronous result
    async demoray2(tocht) {

        let result = await this.connection.query("insert into tocht set ?", [tocht]);

        console.log(result);
        console.log(result.insertId)
    }

    // new a list
    async demoray3List() {
        let all = await this.connection.query("select * from tocht;");

        for(let element of all) {
            console.log(element);
            console.log(element.id)
        }
    }

    stop() {
        this.connection.end(function () {
            console.log("Ending the connection ... Bye ... ");
        });
    }

    async query(sql, args) {
        try {
            let rows = await this.connection.query(sql, args);
            assert(rows);
            console.log(rows);
            console.log(typeof (rows));
            // process.exit();

            return rows;
        }
        catch (error) {
            throw error;
        }

    }

    async insert(tocht) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        try {
            let result = await this.connection.query("insert into tocht set ?", [tocht]);

            let id = result.insertId;
            return id;
        }
        catch (error) {
            throw error;
        }
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
                if (!error) {
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
            this.connection.query("select * from tocht", function (error, rows) {
                if (!error) {
                    resolve(rows);
                }
                else {
                    reject(error);
                }


            })
        });
    }

    getTocht(id) { // be aware: returns a Promise
        return new Promise((resolve, reject) => {
            this.connection.query("select * from tocht where id='?'", [id], (error, rows) => {
                if (!error) {
                    let tocht = rows[0];
                    if (tocht) {
                        resolve(tocht);
                    }
                    else {
                        reject(404);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }

    deleteTochtById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("delete from tocht where id='?'", id, function (error, result) {
                if (!error) {
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
                if (!error) {
                    resolve(result.affectedRows === 1);
                }
                else {
                    reject(false);
                }
            })
        });
    }

    async removeAll() {
        return new Promise((resolve, reject) => {
            this.connection.query("truncate table tocht", (error, result) => {
                if (!error) {
                    resolve(true);
                }
                else {
                    reject(error);
                }
            });
        });
    }
}



module.exports = new Kaartenbak();