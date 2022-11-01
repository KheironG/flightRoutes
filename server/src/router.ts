import * as trpc from '@trpc/server';
import z from 'zod';
import { publicProcedure, router } from './trpc';
import { collections } from "./mongodb";

const Airport = z.object({
    id: z.number(),
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
    country: z.string(),
    city: z.string() ,
    iata: z.string(),
});
const Airports = z.array(Airport);

const appRouter = router({
    getSuggestions: publicProcedure.input(
            z.string()
        ).query( async ( req ) => {
            try {
                if ( collections.airports ) {
                    const airport = (await collections.airports.find({city: "Stockholm"}).toArray()) as any as Airports;
                    if (airport) { return airport; }
                }
            } catch (error) { console.log(error); }
    })
});

export type Airport = z.infer<typeof Airport>;
export type Airports = z.infer<typeof Airports>;
export type AppRouter = typeof appRouter;
export default appRouter;
