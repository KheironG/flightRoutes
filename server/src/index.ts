import express, { Application } from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import trpcRouter from './router';
import { connectToDatabase } from "./mongodb"

const app: Application = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

connectToDatabase()
    .then(() => {
        app.use(express.json());
        app.use(cors());
        app.use(
            '/flightRoutes',
            trpcExpress.createExpressMiddleware({
                router: trpcRouter,
                createContext,
            }),
        );
        app.listen( 8080, () => {
            console.log( "Express server running on port 8080" );
        })
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
