import { ObjectId } from 'mongodb';

export class AirportClass {
    constructor(
        public id: number,
        public type: string,
        public name: string,
        public lat: number,
        public lng: number,
        public elevation: number | string,
        public continent: string,
        public country: string,
        public region: string,
        public city: string,
        public scheduled_service: string,
        public icao: string,
        public iata: string,
        public url: string,
        public wikipedia: string,
        public _id?: ObjectId) {}
}
