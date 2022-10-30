import { useState } from "react";
import './app.scss';
import Map from './components/map/Map';
import Ui from './components/ui/Ui';

import type { AppRouter } from '../../server/src/router';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const trpc = createTRPCReact<AppRouter>();

const App = () => {

    const [ queryClient ] = useState( () => new QueryClient());
    const [ trpcClient ] = useState( () => trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/flightRoutes',
        }),
      ],
    }));

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Map/>
                    <Ui/>
                </div>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
export default App;
