import { useEffect, useState, useMemo } from 'react';
import { trpc } from '../../App';
import './results.scss';
import type { Route, Airport, Airline, Aircraft, Plan } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

import Navigation from '../navigation/Navigation';
import FlightInfo from '../flightinfo/FlightInfo';
import Routes from '../routes/Routes';
import RoutesWithSchedule from '../routes/RoutesWithSchedule';
import Aircrafts from '../aircrafts/Aircrafts';
import Airports from '../airports/Airports';


type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    to: Airport,
    from: Airport,
};

const Results = ( { routes, plan, to, from } : Props ) => {

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
        if ( plan !== undefined
               || ( routes !== undefined && routes.length > 0 )
                    || data.airlines.length > 0 || data.aircrafts.length > 0 ) {
                        showResults(true);
                    }
    }, [data, routes, plan] );

    const [ navState, setNavState ] = useState({ one:false, two:false, three:false, four:false });

    // { plan !== undefined && navState.one
    //     ? <FlightInfo plan={plan} />
    //     : null
    // }
    // { routes !== undefined && plan === undefined && navState.two
    //     ? <Routes routes={routes} airlines={airlines} />
    //     : null
    // }
    // { routes !== undefined && plan !== undefined && plan.distance > 0 && navState.two
    //     ? <RoutesWithSchedule routes={routes} distance={plan.distance} airlines={airlines} />
    //     : null
    // }
    // { aircrafts !== undefined && navState.three
    //     ? <Aircrafts aircrafts={data.aircrafts} />
    //     : null
    // }
    // {navState.four &&
    //     <Airports from={from} to={to} />
    // }

    console.log(results);


    return (
        <div className="results">
        {results &&
            <>
            <Navigation plan={plan} routes={routes} aircrafts={data.aircrafts} setNavState={setNavState} />

            </>
        }
        </div>
    );
}

export default Results;
