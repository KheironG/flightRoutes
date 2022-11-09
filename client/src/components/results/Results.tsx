import { useEffect, useState } from 'react';
import './results.scss';
import type { Route, Airport, Plan } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

import FlightInfo from '../flightinfo/FlightInfo';
import Airports from '../airports/Airports';
import Routes from '../routes/Routes';

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    to: Airport,
    from: Airport
};

const Results = ( { routes, plan, to, from } : Props ) => {

    let airlineCodes: string[] = [];
    let aircrafts: string[] = [];
    const compileData = ( routes: Route[] | undefined ): void => {
        if ( routes !== undefined && routes.length > 0 ) {
            for ( let route of routes ) {
                airlineCodes.push(route.airline);
                let aircraft = route.equipment.toString().split(" ")
                if ( aircraft.length > 0 ) {
                    for ( let instance of aircraft ) {
                        aircrafts.push(instance);
                    }
                }
            }
        }
        return;
    }
    compileData(routes);

    console.log(airlineCodes);
    console.log(aircrafts);

    return (
        <div className="results">
            <div className="navigation">
                <div className="item">
                    <RiRouteFill />
                    <small>info</small>
                </div>
                { routes &&
                    (
                    <div className="item">
                        <MdFlight />
                        <small>flights</small>
                    </div>
                    )
                }
                <div className="item">
                    <RiFlightTakeoffLine />
                    <small>airports</small>
                </div>
            </div>
            { plan && ( <FlightInfo plan={plan} /> ) }
            { routes && ( <Routes routes={routes} /> ) }
            { plan && to && from && ( <Airports to={to} from={from} /> ) }
        </div>
    );
}

export default Results;
