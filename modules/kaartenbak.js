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

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    insert(tocht) { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        return new Promise((resolve, reject) => {
            this.connection.query("insert into tocht set ?", [tocht], (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    tocht.id = result.insertId;
                    resolve(tocht);
                }
            });
        });
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
        this.connection.query('INSERT INTO tocht SET ?', [tocht], (err, result) => {
            console.log("In the query");
            if (!err) {
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
            console.log("There are " + result.affectedRows + " rows deleted!");
        });
    }

    beeindigTocht(id) {
        let end = new Date();
        return this.query("update tocht set end=? where id=?", [end, id]);
    }
}