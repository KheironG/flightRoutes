import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import { collections } from "./mongodb";
import { AirportClass } from "./models/airport"
import { RouteClass } from "./models/route"
dotenv.config();

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

const Plan = z.object({
    id: z.number(),
    fromICAO: z.string().nullable(),
    toICAO: z.string().nullable(),
    fromName: z.string().nullable(),
    toName: z.string().nullable(),
    flightNumber: z.string().nullable(),
    distance: z.number(),
    maxAltitude: z.number(),
    waypoints: z.number(),
    likes: z.number(),
    downloads: z.number(),
    popularity: z.number(),
    notes: z.string(),
    encodedPolyline: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    tags: z.array(z.string()),
    user: z.object({
        id: z.number(),
        username: z.string(),
        gravatarHash: z.string(),
        location: z.string().nullable(),
    }).nullable(),
    application: z.object({
        id: z.number(),
        name: z.string().nullable(),
        url: z.string().nullable(),
    }).nullable(),
    cycle: z.object({
        id: z.number(),
        ident: z.string(),
        year: z.number(),
        release: z.number(),
    }).nullable(),
    plan: z.object({
        nodes : z.array(
            z.object({
                type: z.string(),
                ident: z.string(),
                lat: z.number(),
                lon: z.number(),
                alt: z.number(),
                name: z.string().nullable(),
                via: z.object({
                    ident: z.string(),
                    type: z.string()
                }).nullable(),
            }),
        )
    }).nullable()
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
    getPlans: publicProcedure.input( z.object({ from: z.string(), to: z.string() }) )
        .query( async ( req ) => {
            const url ='https://api.flightplandatabase.com/search/'
            const query = 'plans?fromICAO=' + req.input.from + '&toICAO='  + req.input.to + '&limit=10&includeRoute=true';
            const options = {
            	method: 'GET',
            	headers: { 'Authorization': `${process.env.FLIGHTPLANDB_API_KEY}` }
            };
            try {
                const get = await fetch(url+query, options);
                const resolve = await get.json();
                console.log(resolve);
                return resolve;
            }
            catch (error) {
                console.log(error);
            }
        })
});

export type Airport = z.infer<typeof Airport>;
export type Route = z.infer<typeof Route>;
export type Plan = z.infer<typeof Route>;
export type AppRouter = typeof appRouter;
export default appRouter;
