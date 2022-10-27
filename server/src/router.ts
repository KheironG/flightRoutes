import * as trpc from '@trpc/server';
import z from 'zod';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import assert from 'assert';



let airports: Airport[] = [];

const Airport = z.object({
    id: z.number(),
    ident: z.string(),
    type: z.string(),
    name: z.string(),
    latitude_deg: z.string().or(z.number()),
    longitude_deg: z.string().or(z.number()),
    elevation_ft: z.string().or(z.number()),
    continent: z.string(),
    iso_country: z.string() ,
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

const trpcRouter = trpc.router()
    .query('list', {
        async resolve() {

            const csvPromise = new Promise( (res, rej) => {
                const headers = [ 'id', 'ident', 'type', 'name', 'latitude_deg', 'longitude_deg', 'elevation_ft',
                                    'continent', 'iso_country', 'iso_region', 'municipality', 'scheduled_service',
                                    'gps_code', 'iata_code', 'local_code', 'home_link', 'wikipedia_link', 'keywords' ];

                const data = fs.readFileSync(require.resolve("../airports.csv"), { encoding: 'utf-8'});
                parse(data, {
                    delimiter: ',',
                    columns: headers,
                    on_record: (line, context) => {
                      if ( line.municipality !== 'Stockholm') { return; }
                      return line;
                    },
                }, (error, result: Airport[]) => {
                    if (error) { rej( console.error(error) ); }
                    airports = result;
                    res('complete');
                });
            });

            await csvPromise;
            return airports;

        },
    })

export type Airport = z.infer<typeof Airport>;
export type Airports = z.infer<typeof Airports>;
export type TRPCRouter = typeof trpcRouter;
export default trpcRouter;
