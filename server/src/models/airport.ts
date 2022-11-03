import { ObjectId } from 'mongodb';

export class AirportClass {
    constructor(
        public id: number,
        public name: string,
        public lat: number,
        public lng: number,
        public country: string,
        public city: string,
        public iata: string,
        public _id?: ObjectId) {}
}
