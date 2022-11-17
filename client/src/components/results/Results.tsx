import { useState, useMemo } from 'react';
import { trpc } from '../../App';
import './results.scss';
import type { Airport, Aircraft, Plan, Route } from '../../../../server/src/models/zod';

import Navigation from '../navigation/Navigation';
import FlightInfo from '../flightinfo/FlightInfo';
import Flights from '../flights/Flights';
import Aircrafts from '../aircrafts/Aircrafts';
import Airports from '../airports/Airports';

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

interface Props  {
    plan: Plan,
    flights: Flight[] | [],
    aircrafts: Aircraft[] | [],
    to: Airport,
    from: Airport,
};

const Results = ( { plan, flights, aircrafts, to, from } : Props ) => {

    const [ navState, setNavState ] = useState({ one:true, two:false, three:false, four:false });

    return (
        <>
        <Navigation flights={flights.length > 0 ? true: false}
                    aircrafts={aircrafts.length > 0 ? true: false}
                    setNavState={setNavState}
                    navState={navState}
        />
        {  navState.one
            ? <FlightInfo plan={plan} />
            : null
        }
        { flights.length > 0 && navState.two
            ? <Flights flights={flights} />
            : null
        }
        { aircrafts.length > 0 && navState.three
            ? <Aircrafts aircrafts={aircrafts} />
            : null
        }
        {navState.four &&
            <Airports from={from} to={to} />
        }
        </>
    );
}

export default Results;
