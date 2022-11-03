import { ObjectId } from 'mongodb';

export class RouteClass {
    constructor(
        public airline: string,
        public airline_id: number,
        public dep_airport: string,
        public dep_airport_id: number,
        public arr_airport: string,
        public arr_airport_id: number,
        public codeshare: string,
        public stops: number,
        public equipment: string | number,
        public _id?: ObjectId) {}
}
