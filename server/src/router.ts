import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { collections } from "./mongodb";
import { AirportClass } from "./models/airport"
import { RouteClass } from "./models/route"
import { Airport, Route, Plan } from './models/zod'
dotenv.config();

const appRouter = router({
    getSuggestions: publicProcedure.input( z.string() ).output( z.array(Airport).or(z.undefined()))
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
            catch (error) {
                console.log(error);
            }
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
            catch (error) {
                console.log(error);
            }
        }),
    getPlan: publicProcedure.input( z.object({ from: z.string(), to: z.string() }) )
        .query( async ( req ) => {
            const url ='https://api.flightplandatabase.com/search/'
            const query = 'plans?fromICAO=' + req.input.from + '&toICAO='  + req.input.to + '&limit=1&includeRoute=true';
            const options = {
            	method: 'GET',
            	headers: { 'Authorization': `${process.env.FLIGHTPLANDB_API_KEY}` }
            };
            try {
                const get = await fetch(url+query, options);
                const plan = await get.json();
                return plan;
            }
            catch (error) {
                console.log(error);
            }
        })
});

export type AppRouter = typeof appRouter;
export default appRouter;
