module.exports = class Tocht {

    // start and end are both Date
    constructor(id, start) {
        this._id = id;
        this._start = start;
    }

    get id() {
        return this._id;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    set end(end) {
        this._end = end;
    }
}