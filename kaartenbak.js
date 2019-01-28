let Tocht = require('./tocht.js');

module.exports = class Kaartenbak {

    constructor() {
        this._tochten = [];
    }
    
    createTocht(start) {
        let tocht = new Tocht(this._tochten.length+1, start );
        this._tochten[this._tochten.length] = tocht;

        return tocht;
    }

    getTochten() {
        return this._tochten;
    }


    addTocht(tocht) {
        this._tochten[this._tochten.length] = tocht;
    }

    getTocht(id) {
        return this._tochten[id-1];
    }
    
}