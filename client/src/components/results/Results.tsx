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
    aircrafts: Aircraft[] | [];
    airlines: Airline[] | [];
    to: Airport,
    from: Airport,
};

const Results = ( { routes, plan, aircrafts, airlines, to, from } : Props ) => {

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


    return (
        <h5>test</h5>
    );
}

export default Results;
