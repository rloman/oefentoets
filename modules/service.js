const util = require("util");
const assert = require("./utils.js").assert;

class Service {

    constructor() {
        this.repository = require("./repository");
    }


    async save(trip) {
        return await this.repository.create(trip);
    }


    async create() { // might refactor this to return the Promise and get the id als the key (in fact I am doing this)
        let trip = {
            start: new Date()
        };

        return await this.repository.create(trip);
    }

    async findAll() {

        return await this.repository.findAll();
    }

    async findById(id) { // be aware: returns a Promise
        return await this.repository.findById(id);
    }

    async updateById(id, data) {
        return await this.repository.updateById(id, data);
    }


    async endTrip(id) {
       return await this.repository.endTrip(id);
    }

    async deleteById(id) {
       return this.repository.deleteById(id);
    }

    async deleteAll() {
      return this.repository.deleteAll();
    }

    stop() {
        this.repository.stop();
    }
}

module.exports = new Service();