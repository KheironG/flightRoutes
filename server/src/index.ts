import express, { Application } from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import trpcRouter from './router';

const app: Application = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

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
