import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import { ObjectId } from 'mongodb';
import { collections } from "./mongodb";
import { Airport, Route } from "./zod"

class AirportClass {
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

class RouteClass {
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

const appRouter = router({
    getSuggestions: publicProcedure.input( z.string() ).output( z.array(Airport).or(z.undefined()) )
        .query( async ( req ) => {
            try {
                if ( collections.airports ) {
                    const airport = (await collections.airports.find({
                        '$or':[
                            {'name':{'$regex':req.input, '$options':'i'}},
                            {'city':{'$regex':req.input, '$options':'i'}}
                        ]}).toArray()) as AirportClass[];
                    if (airport) {
                        return airport;
                    }
                }
            } catch (error) { console.log(error); }
        }),
    getRoutes: publicProcedure.input( z.object({ from: z.string(), to: z.string() }) ).output( z.array(Route).or(z.undefined()) )
        .query( async ( req ) => {
            try {
                if ( collections.routes ) {
                    const routes = (await collections.routes.find({
                        "dep_airport":req.input.from,
                        "arr_airport":req.input.to
                    }).toArray()) as RouteClass[];
                    if (routes) {
                        return routes;
                    }
                }
            } catch (error) { console.log(error); }
        })
});

export type Airport = z.infer<typeof Airport>;
export type Route = z.infer<typeof Route>;
export type AppRouter = typeof appRouter;
export default appRouter;
