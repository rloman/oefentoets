// mysql part
const mysql = require('mysql');
let Tocht = require('./tocht.js');

module.exports = class Kaartenbak {

    constructor(connection) {
        this.connection = connection;
    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    insert(start) {
      
        const tocht = {
            start: start
        };
        console.log(tocht);
        console.log("About to insert ... ");
        this.connection.query('INSERT INTO tocht SET ?', tocht, function(err, result)  {
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
    

    createTocht(start) {
        // let tocht = insert(start);
       let result = this.insert(start);
       console.log(result.id);
    }

    getTochten() {
        // return this._tochten;
    }

    getTocht(id) {
        // return this._tochten[id-1];
    }

}