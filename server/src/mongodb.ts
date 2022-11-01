import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { airports?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.MONGODB_URI}`);
    await client.connect();
    const db: mongoDB.Db = client.db(`${process.env.DB_NAME}`);
    const airportsCollection: mongoDB.Collection = db.collection(`${process.env.AIRPORTS_COLLECTION_NAME}`);
    collections.airports = airportsCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${airportsCollection.collectionName}`);
}
