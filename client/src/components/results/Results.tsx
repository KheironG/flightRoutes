import { useEffect, useState } from 'react';
import { trpc } from '../../App';
import './results.scss';
import type { Route, Airport, Airline, Aircraft, Plan } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

import FlightInfo from '../flightinfo/FlightInfo';
import Aircrafts from '../aircrafts/Aircrafts';
import Routes from '../routes/Routes';
import RoutesWithSchedule from '../routes/RoutesWithSchedule';
import Navigation from '../navigation/Navigation';

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    to: Airport,
    from: Airport
};

const Results = ( { routes, plan, to, from } : Props ) => {

    //Compiles airline and aircraft codes from routes object
    let airlineCodes: string[] = [];
    let aircraftCodes: (string | number)[] = [];
    const compileData = ( routes: Route[] | undefined ): void => {
        if ( routes !== undefined && routes.length > 0 ) {
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
        }
        return;
    }
    compileData(routes);

    //Queries database for airlines and aircraft
    const getAirlines = trpc.getAirlines.useQuery( airlineCodes, { enabled: false } );
    const getAircrafts = trpc.getAircrafts.useQuery( aircraftCodes, { enabled: false } );
    useEffect(() => {
        if ( routes !== undefined && routes.length > 0 ) {
            if ( airlineCodes.length > 0 ) {
                getAirlines.refetch();
            }
            if ( aircraftCodes.length > 0 ) {
                getAircrafts.refetch();
            }
            return;
        }
    }, [routes, airlineCodes, aircraftCodes] );

    //Sets airlines and aircraft state if calls to getAirlines and getAircrafts are successful
    const [ airlines, setAirlines ] = useState<Airline[] | undefined>(undefined);
    const [ aircrafts, setAircrafts ] = useState<Aircraft[] | undefined>(undefined);
    useEffect(() => {
        if ( getAirlines.isSuccess === true && getAircrafts.isSuccess === true ) {
            setAirlines(getAirlines.data);
            setAircrafts(getAircrafts.data);
            return;
        }
    }, [getAirlines, getAircrafts] );

    return (
        <div className="results">
            <Navigation plan={plan} routes={routes} />
            { plan !== undefined
                ? <FlightInfo plan={plan} />
                : null
            }
            { routes !== undefined && plan === undefined
                ? <Routes routes={routes} airlines={airlines} />
                : null
            }
            { routes !== undefined && plan !== undefined && plan.distance > 0
                ? <RoutesWithSchedule routes={routes} distance={plan.distance} airlines={airlines} />
                : null
            }
            { aircrafts !== undefined
                ? <Aircrafts aircrafts={aircrafts} />
                : null
            }
        </div>
    );
}

export default Results;
