import { useState, useEffect } from "react";
import './app.scss';
import MapBox from './components/map/Map';
import Ui from './components/ui/Ui';
import { Airport, defaultAirport } from './typescript';
import type { Plan } from '../../server/src/models/zod'

import type { AppRouter } from '../../server/src/router';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const trpc = createTRPCReact<AppRouter>();

const App = () => {

    const [ queryClient ] = useState( () => new QueryClient());
    const [ trpcClient ] = useState( () => trpc.createClient({
      links: [ httpBatchLink({ url: 'http://localhost:8080/flightRoutes' })]
    }));

    const [ from, setFrom ] = useState(defaultAirport);
    const [ to, setTo ] = useState(defaultAirport);
    const [ plan, setPlan ] = useState<Plan | undefined>(undefined);

    useEffect(() => {
        setPlan(undefined);
    }, [from, to]);

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <MapBox from={from} to={to} plan={plan} />
                    <Ui from={from} setFrom={setFrom} to={to} setTo={setTo} plan={plan} setPlan={setPlan} />
                </div>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
export default App;
