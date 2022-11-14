import { useEffect, useState, useMemo } from 'react';
import { trpc } from '../../App';
import { compileFlights } from '../../modules/compileFlights';
import { compileCodes } from '../../modules/compileCodes';
import '../results/results.scss';
import type { Route, Airport, Airline, Aircraft, Plan } from '../../../../server/src/models/zod';

import Results from '../results/Results';

type Props = {
    routes: Route[] | undefined;
    plan: Plan;
    to: Airport,
    from: Airport,
};

const Bridge = ( { routes, plan, to, from } : Props ) => {

    const [ results, showResults ] = useState(false);


    //Compiles and memoizes airline and aircraft codes from route objects
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


    //Sets aircrafts and airlines data to state
    type Data = {
        airlines: Airline[] | [] | undefined,
        aircrafts: Aircraft[] | [] | undefined
    }
    const [ airlinesAircrafts, setAirlinesAircrafts ] = useState<Data>({airlines:undefined, aircrafts:undefined});
    useEffect(() => {
        if ( getAirlines.isSuccess && getAircrafts.isSuccess ) {
            console.log('set aircraft and airlines');
            setAirlinesAircrafts({
                airlines: getAirlines.data,
                aircrafts: getAircrafts.data
            });
        }
    }, [getAirlines.isSuccess, getAircrafts.isSuccess] );


    //Compiles route and airline data into flight objects and sets to flights state
    type Schedule = {
        travelTime: string,
        departureTime: string,
        arrivalTime: string
    }
    interface Flight {
        route: Route,
        schedule: Schedule,
        airline: string
    }
    const [ flights, setFlights ] = useState<Flight[] | [] | undefined>(undefined);
    useEffect(() => {
        if ( airlinesAircrafts.airlines !== undefined ) {
            setFlights(compileFlights( routes, airlinesAircrafts.airlines, plan.distance ));
        }
    }, [airlinesAircrafts.airlines] );


    useEffect(() => {
        if ( flights !== undefined && airlinesAircrafts.aircrafts !== undefined ) {
            showResults(true);
            return;
        }
    }, [airlinesAircrafts.aircrafts, flights] );


    return (
        <div className="results">
        {results === true && flights !== undefined && airlinesAircrafts.aircrafts !== undefined 
            ? <Results plan={plan} flights={flights} aircrafts={airlinesAircrafts.aircrafts} from={from} to={to} />
            : null
        }
        </div>
    );
}

export default Bridge;
