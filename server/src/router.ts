import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import { collections } from "./mongodb";
import { Airports, Airport, Routes, Route } from "./schemas"

const appRouter = router({
    getSuggestions: publicProcedure.input( z.string() )
        .query( async ( req ) => {
            try {
                if ( collections.airports ) {
                    const airport = (await collections.airports.find({city: req.input }).toArray()) as any as Airports;
                    if (airport) { return airport; }
                }
            } catch (error) { console.log(error); }
        }),
    getRoutes: publicProcedure.input( z.string() )
        .query( async ( req ) => {
            try {
                if ( collections.routes ) {
                    const routes = (await collections.routes.find({ dep_airport: req.input }).toArray()) as any as Routes;
                    if (routes) { return routes; }
                }
            } catch (error) { console.log(error); }
        })
});

export type Airport = z.infer<typeof Airport>;
export type Airports = z.infer<typeof Airports>;
export type Route = z.infer<typeof Route>;
export type Routes = z.infer<typeof Routes>;
export type AppRouter = typeof appRouter;
export default appRouter;
