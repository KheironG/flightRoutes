import { ObjectId } from 'mongodb';

export class AircraftClass {
    constructor(
        public name: string,
        public iata: string,
        public icao: string,
        public _id?: ObjectId) {}
}
