import './routes.scss';
import type { Route, Airline, Plan } from '../../../../server/src/models/zod';
import { BsArrowRight } from "react-icons/bs";

type Props = {
    routes: Route[];
    distance: number;
    airlines: Airline[] | undefined;
};

const RoutesSchedule = ( { routes, distance, airlines } : Props ) => {

    const airlineOutput = ( airline: string, airlines: Airline[] | undefined ): string => {
        if ( airlines !== undefined ) {
            for ( let i = 0; i < airlines.length; i++) {
                if ( airline == airlines[i].iata ) {
                    return airlines[i].name;
                }
            }
            return airline;
        }
        return airline;
    }

    type Schedule = {
        travelTime: string,
        departureTime: string,
        arrivalTime: string
    }

    const generateSchedule = ( distance: number ): Schedule => {
        const travelTime: number = distance / Math.floor(Math.random() * ( 940-740 ) + 740 ) * 60;
        const h: number = Math.floor(travelTime / 60);
        const min: number = Math.floor(travelTime % 60);

        const depH: number = Math.floor(Math.random() * 23);
        const depMin: number = Math.floor(Math.random() * 59);
        let addH: number = 0;
        let arrMin: number = 0;
        if ( depMin + min > 60 ) {
            addH += 1;
            arrMin += depMin + min - 59;
        } else {
            arrMin += depMin + min;
        }
        let arrH: number = (depH + h + addH) > 23  ? (depH + h + addH) - 23 : depH + h + addH;

        const data: Schedule = {
              travelTime: h.toString() + "hour " + min.toString() + "min",
              departureTime: ('0' + depH).slice(-2) + ":" + ('0' + depMin).slice(-2),
              arrivalTime: ('0' + arrH).slice(-2) + ":" + ('0' + arrMin).slice(-2)
        };
        return data;
    }

    return (
        <div className="routes">
            {routes.map( ( route ) => {
                const schedule: Schedule = generateSchedule(distance);
                return(
                    <div className="route">
                        <div className="details">
                            <div className="column">
                                <h3>{schedule.departureTime}</h3>
                                <p>{route.dep_airport}</p>
                            </div>
                            <div className="column">
                                <BsArrowRight fontSize="1.8em" />
                                <small>{schedule.travelTime}</small>
                            </div>
                            <div className="column">
                                <h3>{schedule.arrivalTime}</h3>
                                <p>{route.arr_airport}</p>
                            </div>
                        </div>
                        <div className="airline">
                            {airlineOutput( route.airline, airlines )}
                        </div>
                    </div>
                )
            })
        }
        </div>
    );
}

export default RoutesSchedule;
