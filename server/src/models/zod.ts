import z from 'zod';

export const Airport = z.object({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
    elevation: z.number(),
    continent: z.string(),
    country: z.string(),
    region: z.string(),
    city: z.string(),
    scheduled_service: z.string(),
    icao: z.string(),
    iata: z.string(),
    url: z.string(),
    wikipedia: z.string(),
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

export const Plan = z.object({
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

export type Airport = z.infer<typeof Airport>;
export type Route = z.infer<typeof Route>;
export type Plan = z.infer<typeof Plan>;
