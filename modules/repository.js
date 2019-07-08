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

    async create(trip) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        let result = await this.connection.query("insert into trip set ?", [trip]);

        let id = result.insertId;
        trip.id = id;

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
          return false;
        }
    }

    async updateById(id, data) {

        let affectedRows = await this.connection.query("update trip set start=?, end=? where id=?", [data.start, data.end, id]);

        let updatedTrip = await this.findById(id);

        return updatedTrip;
    }


    async endTrip(id) {
        let end = new Date();

        let result = await this.connection.query("update trip set end=? where id=?", [end, id]);

        return result.affectedRows === 1;
    }

    async deleteById(id) {
        let result = await this.connection.query("delete from trip where id='?'", id);
        
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