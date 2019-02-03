module.exports = class Tocht {

    // start and end are both Date
    constructor(start) {
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

    duration() {

        let timeDiff = Math.abs(this._end.getTime() - this._start.getTime());

        return timeDiff;

    }

    durationAsString() {
        let timeDiff = this.duration();
        let hours = Math.floor(timeDiff / 1000 / 60 / 60);
        let hoursAsString = "00" + hours;
        hoursAsString = hoursAsString.substring(hoursAsString.length - 2, hoursAsString.length);
    
        let minutes = Math.floor(timeDiff / 1000 / 60 % 60);
        let minutesAsString = "00" + minutes;
        minutesAsString = minutesAsString.substring(minutesAsString.length - 2, minutesAsString.length);

        return `${hoursAsString}:${minutesAsString}`;
    }
}