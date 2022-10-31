import * as trpc from '@trpc/server';
import z from 'zod';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import { publicProcedure, router } from './trpc';

const Airport = z.object({
    id: z.number(),
    name: z.string(),
    lat: z.string().or(z.number()),
    lng: z.string().or(z.number()),
    country: z.string(),
    city: z.string() ,
    iata: z.string(),
});
const Airports = z.array(Airport);

const appRouter = router({
    getSuggestions: publicProcedure.input(
            z.string()
        ).query( async (req) => {
        let airports: Airport[] = [];
        const csvPromise = new Promise( (res, rej) => {
            const headers: string[] = [ 'id', 'name', 'lat', 'lng', 'country', 'city', 'iata' ];
            const data = fs.readFileSync(require.resolve("../airports.csv"), { encoding: 'utf-8'} );
            parse(data, {
                delimiter: ',',
                columns: headers,
                on_record: (line, context) => {
                    if ( line.city.toLowerCase().includes(req.input.toLowerCase()) === true
                        || line.name.toLowerCase().includes(req.input.toLowerCase()) === true )
                        { return line; }
                    return;
                },
            }, (error, result: Airport[]) => {
                if (error) { rej( console.error(error) ); }
                airports = result;
                res('complete');
            });
        });
        await csvPromise;
        return airports;
    })
});

export type Airport = z.infer<typeof Airport>;
export type Airports = z.infer<typeof Airports>;
export type AppRouter = typeof appRouter;
export default appRouter;
