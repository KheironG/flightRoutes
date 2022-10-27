import { useState } from "react";
import logo from '../public/images/logo.png'
import './app.scss';
import Map from './components/map/Map';

import type { TRPCRouter } from '../../server/src/router';
import { createReactQueryHooks } from '@trpc/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const BACKEND_URL: string = "http://localhost:8080/cat";

export const trpc = createReactQueryHooks<TRPCRouter>();

 const App = () => {

     const [ queryClient ] = useState( () => new QueryClient());
     const [ trpcClient ] = useState( () => trpc.createClient( { url: BACKEND_URL }));

     // <img src={logo} alt="flightRoutes"/>
     // <h4>loading application</h4>

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Map/>
                </div>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
export default App;
