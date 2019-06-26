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

        tocht.id = result.insertId;

        return tocht;
    }

    // new a list
    async demoray3List() {
        let all = await this.connection.query("select * from tocht;");

        return all;
    }

    stop() {
        this.connection.end(function () {
            console.log("Ending the connection ... Bye ... ");
        });
    }

    async query(sql, args) {
        let rows = await this.connection.query(sql, args);

        return rows;
    }

    async insert(tocht) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        let result = await this.connection.query("insert into tocht set ?", [tocht]);

        let id = result.insertId;
        tocht.id = id;
        return tocht;
    }

    async createTocht(start) {
        let tocht = {
            start: start
        }
        return await this.insert(tocht);
    }

    async insertAlternate(start) {

        const tocht = {
            start: start
        };

        // use an array function here instead of function() since else this.connection would be undefined
        // better said: an arrow function has lexical scope. here, this is the kaartenbak (hence this.connection is reachable)
        let result = await this.connection.query("insert into tocht set ?", [tocht]);
        tocht.id = result.insertId;

        return tocht;

    }

    async getTochten() {

        let rows = await this.connection.query("select * from tocht");
        return rows;
    }

    async getTocht(id) { // be aware: returns a Promise
        let rows = await this.connection.query("select * from tocht where id='?'", [id]);
        let tocht = rows[0];
        if (tocht) {
            return tocht;
        }
        else {
            throw new Error("Duplate tocht found for row with id: " + id);
        }
    }


    async deleteTochtById(id) {
        let result = await this.connection.query("delete from tocht where id='?'", id);
        return result.affectedRows === 1;
    }

    async beeindigTocht(id) {
        let end = new Date();

        let result = await this.connection.query("update tocht set end=? where id=?", [end, id]);

        return result.affectedRows === 1;
    }

    async removeAll() {
        let result = await this.connection.query("truncate table tocht");

        return !!result;
    }
}

module.exports = new Kaartenbak();