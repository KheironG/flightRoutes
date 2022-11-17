import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
    airports?: mongoDB.Collection
    routes?: mongoDB.Collection
    airlines?: mongoDB.Collection
    aircrafts?: mongoDB.Collection
} = {}

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.MONGODB_URI}`);
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);
    const airports: mongoDB.Collection = db.collection(`${process.env.AIRPORTS_COLLECTION_NAME}`);
    const routes: mongoDB.Collection = db.collection(`${process.env.ROUTES_COLLECTION_NAME}`);
    const airlines: mongoDB.Collection = db.collection(`${process.env.AIRLINES_COLLECTION_NAME}`);
    const aircrafts: mongoDB.Collection = db.collection(`${process.env.AIRCRAFTS_COLLECTION_NAME}`);
    collections.airports = airports;
    collections.routes = routes;
    collections.airlines = airlines;
    collections.aircrafts = aircrafts;
    console.log(`Connected to ${db.databaseName} database`);
}
