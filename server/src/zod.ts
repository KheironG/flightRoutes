import z from 'zod';

export const Airport = z.object({
    id: z.number(),
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
    country: z.string(),
    city: z.string() ,
    iata: z.string(),
});

export const Route = z.object({
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
