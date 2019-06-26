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
        this.connection.query = util.promisify(this.connection.query); // Magic happens here.
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

        let tochten = await this.connection.query("select * from tocht");
        return tochten;
    }

    async getTocht(id) { // be aware: returns a Promise
        let rows = await this.connection.query("select * from tocht where id='?'", [id]);
        let tocht = rows[0];
        if (tocht) {
            return tocht;
        }
        else {
            throw new Error("Duplicate tocht found for row with id: " + id);
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

    stop() {
        this.connection.end(function () {
            console.log("Ending the connection ... Bye ... ");
        });
    }
}

module.exports = new Kaartenbak();