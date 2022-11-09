import { ObjectId } from 'mongodb';

export class AirlineClass {
    constructor(
        public name: string,
        public alias: string,
        public iata: string,
        public icao: string,
        public callsign: string,
        public country: string,
        public active: string,
        public _id?: ObjectId) {}
}
