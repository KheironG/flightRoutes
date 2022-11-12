import { useEffect, useState, useMemo } from 'react';
import { trpc } from '../../App';
import '../results/results.scss';
import type { Route, Airport, Airline, Aircraft, Plan } from '../../../../server/src/models/zod';

import Results from '../results/Results';

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    to: Airport,
    from: Airport,
};

const Bridge = ( { routes, plan, to, from } : Props ) => {

    //Compiles and memoizes airline and aircraft codes
    type Codes = {
        airlineCodes: string[]
        aircraftCodes:(string | number)[]
    }
    const compileCodes = ( routes: Route[] | undefined ): Codes  => {
        let airlineCodes: string[] = [];
        let aircraftCodes: (string | number)[] = [];
        let codes: Codes = { airlineCodes: [], aircraftCodes: [] };
        if ( routes !== undefined && routes.length > 0 ) {
            console.log('compiling data');
            for ( let route of routes ) {
                airlineCodes.push(route.airline);
                let aircraft = route.equipment.toString().split(" ")
                if ( aircraft.length > 0 ) {
                    for ( let instance of aircraft ) {
                        if ( instance.match(/^[0-9]+$/) != null ) {
                            aircraftCodes.push(parseInt(instance));
                        } else {
                            aircraftCodes.push(instance);
                        }
                    }
                }
            }
            codes.airlineCodes = airlineCodes;
            codes.aircraftCodes = aircraftCodes;
        }
        return codes;
    }
    const codes = useMemo(() => compileCodes( routes ), [ routes ]);


    //Queries database for airlines and aircraft
    const getAirlines = trpc.getAirlines.useQuery( codes.airlineCodes, { enabled: false } );
    const getAircrafts = trpc.getAircrafts.useQuery( codes.aircraftCodes, { enabled: false } );
    useEffect(() => {
        if ( routes !== undefined && routes.length > 0 ) {
            if ( codes.airlineCodes.length > 0 ) {
                console.log('get airlines');
                getAirlines.refetch();
            }
            if ( codes.aircraftCodes.length > 0 ) {
                console.log('get aircrafts');
                getAircrafts.refetch();
            }
        }
        return;
    }, [codes] );


    //Memoizes aircraft and airline data
    type Data = {
        airlines: Airline[] | [],
        aircrafts: Aircraft[] | []
    }
    const setData = ( airlineResponse: any,  aircraftsResponse: any ): Data => {
        let data: Data = { airlines: [], aircrafts: [] };
        if ( airlineResponse.isSuccess && aircraftsResponse.isSuccess ) {
            console.log('set aircraft and airlines');
            data.airlines = airlineResponse.data;
            data.aircrafts = aircraftsResponse.data;
            getAirlines.remove();
            getAircrafts.remove();
        }
        return data;
    }
    const data = useMemo(() => setData( getAirlines, getAircrafts ), [ getAirlines, getAircrafts ]);

    
    const [ results, showResults ] = useState(false);
    useEffect(() => {
        if ( plan === undefined ) {
            showResults(false);
            return;
        }
        if ( plan !== undefined
            || ( routes !== undefined && routes.length > 0 )
                || data.airlines.length > 0 || data.aircrafts.length > 0 ) {
                    showResults(true);
                    return;
        }
    }, [data, routes, plan] );

    return (
        <div className="results">
        {results &&
            <Results plan={plan} routes={routes} aircrafts={data.aircrafts} airlines={data.airlines} from={from} to={to} />
        }
        </div>
    );
}

export default Bridge;
