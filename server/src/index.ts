import express, { Application } from 'express';
import cors from 'cors';
import * as trcpExpress from '@trpc/server/adapters/express';
import trpcRouter from './router';

const app: Application = express();

const createContext = ( {}: trcpExpress.CreateExpressContextOptions ) => ({});

app.use(express.json());
app.use(cors());
app.use(
    '/airports',
    trcpExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext,
    }),
);


app.listen( 8080, () => {
    console.log( "Express server running on port 8080" );
})
