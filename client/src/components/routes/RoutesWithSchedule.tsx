import './routes.scss';
import type { Route, Airline } from '../../../../server/src/models/zod';
import { BsArrowRight } from "react-icons/bs";

type Props = {
    routes: Route[];
    distance: number;
    airlines: Airline[] | undefined;
};

const RoutesWithSchedule = ( { routes, distance, airlines } : Props ) => {

    //If airline names exists is airlines object, return airline name, else return airline IATA code
    const airlineOutput = ( airline: string, airlines: Airline[] | undefined ): string => {
        if ( airlines !== undefined ) {
            for ( let i = 0; i < airlines.length; i++) {
                if ( airline == airlines[i].iata ) {
                    return airlines[i].name;
                }
            }
        }
        return airline;
    }

    type Schedule = {
        travelTime: string,
        departureTime: string,
        arrivalTime: string
    }

    const generateSchedule = ( distance: number ): Schedule => {
        //Determines flight time in hours and minutes
        const travelTime: number = distance / Math.floor(Math.random() * ( 940-740 ) + 740 ) * 60;
        const h: number = Math.floor(travelTime / 60);
        const min: number = Math.floor(travelTime % 60);

        //Generates a random flight schedule based on travelTime
        const depH: number = Math.floor(Math.random() * 23);
        const depMin: number = Math.floor(Math.random() * 59);
        let addH: number = 0;
        let arrMin: number = 0;
        if ( depMin + min > 60 ) {
            addH += 1;
            arrMin += depMin + min - 60;
        } else {
            arrMin += depMin + min;
        }
        let arrH: number = (depH + h + addH) > 23  ? (depH + h + addH) - 23 : depH + h + addH;

        //Returns object with traveltime and schedule properties
        const twoDigit = ( value: number ): string => {
            return ('0' + value).slice(-2);
        }
        const data: Schedule = {
              travelTime: h.toString() + "hour " + min.toString() + "min",
              departureTime: twoDigit(depH) + ":" + twoDigit(depMin),
              arrivalTime: twoDigit(arrH) + ":" + twoDigit(arrMin)
        };
        return data;
    }

    return (
        <div className="routes">
            {routes.map( ( route ) => {
                const schedule: Schedule = generateSchedule(distance);
                const airline: string = airlineOutput( route.airline, airlines);
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
                            {airline}
                        </div>
                    </div>
                )
            })
        }
        </div>
    );
}

export default RoutesWithSchedule;
