let mysql = require('mysql');
const util = require("util");
const assert = require("./utils.js").assert;

class Repository {

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

    // used private!!!
    async query(sql, args) {
        let rows = await this.connection.query(sql, args);

        return rows;
    }

    async insert(trip) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        let result = await this.connection.query("insert into trip set ?", [trip]);

        let id = result.insertId;
        trip.id = id;

        return trip;
    }

    async create(start) {
        let trip = {
            start: start
        }
        return await this.insert(trip);
    }

    async createWithStartDate(start) {

        const trip = {
            start: start
        };

        // use an array function here instead of function() since else this.connection would be undefined
        // better said: an arrow function has lexical scope. here, this is the kaartenbak (hence this.connection is reachable)
        let result = await this.connection.query("insert into trip set ?", [trip]);
        trip.id = result.insertId;

        return trip;

    }

    async findAll() {

        let trips = await this.connection.query("select * from trip");
        return trips;
    }

    async findById(id) { // be aware: returns a Promise
        let rows = await this.connection.query("select * from trip where id='?'", [id]);
        let trip = rows[0];
        if (trip) {
            return trip;
        }
        else {
            throw new Error("Duplicate trip found for row with id: " + id);
        }
    }


    async deleteById(id) {
        let result = await this.connection.query("delete from trip where id='?'", id);
        return result.affectedRows === 1;
    }

    async endTrip(id) {
        let end = new Date();

        let result = await this.connection.query("update trip set end=? where id=?", [end, id]);

        return result.affectedRows === 1;
    }

    async deleteAll() {
        let result = await this.connection.query("truncate table trip");

        return !!result;
    }

    stop() {
        this.connection.end(function () {
            console.log("Ending the connection ... Bye ... ");
        });
    }
}

module.exports = new Repository();