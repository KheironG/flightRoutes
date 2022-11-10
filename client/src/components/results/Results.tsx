import { useEffect, useState } from 'react';
import { trpc } from '../../App';
import './results.scss';
import type { Route, Airport, Airline, Aircraft, Plan } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

import FlightInfo from '../flightinfo/FlightInfo';
import Airports from '../airports/Airports';
import Routes from '../routes/Routes';
import RoutesSchedule from '../routes/RoutesSchedule';

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    to: Airport,
    from: Airport
};

const Results = ( { routes, plan, to, from } : Props ) => {

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

    const getAirlines = trpc.getAirlines.useQuery( airlineCodes, { enabled: false } );
    const getAircrafts = trpc.getAircrafts.useQuery( aircraftCodes, { enabled: false } );
    const [ airlines, setAirlines ] = useState<Airline[] | undefined>();
    const [ aircrafts, setAircrafts ] = useState<Aircraft[] | undefined>();
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
    }, [routes, airlineCodes, aircraftCodes ] );
    useEffect(() => {
        if ( getAirlines.isSuccess === true && getAircrafts.isSuccess === true ) {
            setAirlines(getAirlines.data);
            setAircrafts(getAircrafts.data);
            return;
        }
    }, [ getAirlines, getAircrafts ] );


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
            { plan &&
                ( <FlightInfo plan={plan} /> )
            }
            { routes !== undefined && plan === undefined
                ? ( <Routes routes={routes} airlines={airlines} /> )
                : null
            }
            { routes !== undefined && plan !== undefined
                ? ( <RoutesSchedule routes={routes} distance={plan.distance} airlines={airlines} />  )
                : null
            }
            { plan && to && from &&
                ( <Airports to={to} from={from} /> )
            }
        </div>
    );
}

export default Results;
