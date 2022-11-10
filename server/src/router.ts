import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { collections } from "./mongodb";
import { AirportClass } from "./models/airport"
import { RouteClass } from "./models/route"
import { AirlineClass } from "./models/airline"
import { AircraftClass } from "./models/aircraft"
import { Airport, Route, Airline, Aircraft, Plan, Weather } from './models/zod'
dotenv.config();

const flightPlanDbUrl ='https://api.flightplandatabase.com/';
const flightPlanDbOptions = {
    method: 'GET',
    headers: {
        'Authorization': `${process.env.FLIGHTPLANDB_API_KEY}`,
        'X-Units': 'METRIC'
    }
};

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
    getAirlines: publicProcedure.input( z.array( z.string() ) ).output( z.array(Airline).or(z.undefined()) )
        .query( async ( req ) => {
            try {
                if ( collections.airlines ) {
                    const airlines = (await collections.airlines.find({
                        iata: { $in: req.input }
                    }).toArray()) as AirlineClass[];
                    if (airlines) {
                        return airlines;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }),
    getAircrafts: publicProcedure.input( z.array( z.string().or(z.number()) ) ).output( z.array( Aircraft ).or( z.undefined() ) )
        .query( async ( req ) => {
            try {
                if ( collections.aircrafts ) {
                    const aircrafts = (await collections.aircrafts.find({
                        iata: { $in : req.input }
                    }).toArray()) as AircraftClass[];
                    if (aircrafts) {
                        return aircrafts;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }),
    getPlan: publicProcedure.input( z.object({ from: z.string(), to: z.string() }) ).output( z.array(Plan) )
        .query( async ( req ) => {
            const query = 'search/plans?fromICAO=' + req.input.from + '&toICAO='  + req.input.to + '&limit=1&includeRoute=true';
            try {
                const get = await fetch(flightPlanDbUrl+query, flightPlanDbOptions);
                const plan = await get.json();
                return plan;
            }
            catch (error) {
                console.log(error);
            }
        }),
    getWeather: publicProcedure.input( z.string() ).output( Weather )
        .query( async ( req ) => {
            const query = 'weather/' + req.input;
            try {
                const get = await fetch(flightPlanDbUrl+query, flightPlanDbOptions);
                const weather = await get.json();
                return weather;
            }
            catch (error) {
                console.log(error);
            }
        })
});

export type AppRouter = typeof appRouter;
export default appRouter;
