import * as trpc from '@trpc/server';
import z from 'zod';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import { publicProcedure, router } from './trpc';

const Airport = z.object({
    id: z.number(),
    ident: z.string(),
    type: z.string(),
    name: z.string(),
    latitude_deg: z.string().or(z.number()),
    longitude_deg: z.string().or(z.number()),
    elevation_ft: z.string().or(z.number()),
    continent: z.string(),
    iso_country: z.string(),
    iso_region: z.string() ,
    municipality: z.string() ,
    scheduled_service: z.string(),
    gps_code: z.string(),
    iata_code: z.string(),
    local_code: z.string() ,
    home_link: z.string() ,
    wikipedia_link: z.string(),
    keywords: z.string()
});
const Airports = z.array(Airport);

const appRouter = router({
    getSuggestions: publicProcedure.input(
            z.string()
        ).query( async (req) => {
        let airports: Airport[] = [];
        const csvPromise = new Promise( (res, rej) => {
            const headers: string[] = [ 'id', 'ident', 'type', 'name', 'latitude_deg', 'longitude_deg', 'elevation_ft',
                                        'continent', 'iso_country', 'iso_region', 'municipality', 'scheduled_service',
                                        'gps_code', 'iata_code', 'local_code', 'home_link', 'wikipedia_link', 'keywords'];
            const data = fs.readFileSync(require.resolve("../airports.csv"), { encoding: 'utf-8'} );
            parse(data, {
                delimiter: ',',
                columns: headers,
                on_record: (line, context) => {
                    if ( line.municipality.toLowerCase().includes(req.input.toLowerCase()) === true
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
