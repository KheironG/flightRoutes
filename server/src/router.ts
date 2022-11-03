import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import { ObjectId } from 'mongodb';
import { collections } from "./mongodb";
import { AirportClass } from "./models/airport"
import { RouteClass } from "./models/route"

const Airport = z.object({
    id: z.number(),
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
    country: z.string(),
    city: z.string() ,
    iata: z.string(),
});

const Route = z.object({
    airline: z.string(),
    airline_id: z.number(),
    dep_airport: z.string(),
    dep_airport_id: z.number(),
    arr_airport: z.string(),
    arr_airport_id: z.number(),
    codeshare: z.string(),
    stops: z.number(),
    equipment: z.string().or(z.number())
});

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
            }
            catch (error) { console.log(error); }
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
            }
            catch (error) { console.log(error); }
        })
});

export type Airport = z.infer<typeof Airport>;
export type Route = z.infer<typeof Route>;
export type AppRouter = typeof appRouter;
export default appRouter;
