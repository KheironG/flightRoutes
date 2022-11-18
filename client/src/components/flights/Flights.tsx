import './flights.scss';
import type { Route } from '../../../../server/src/models/zod';

import { BsArrowRight } from "react-icons/bs";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";

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

interface Props {
    flights: Flight[]
};

const Flights = ( { flights } : Props ) => {
    return (
        <div className="routes">
            <h3>Flights on this route</h3>
            {flights.map( ( flight ) => {
                return(
                    <div className="route">
                        <div className="details">
                            <div className="column">
                                <MdFlightTakeoff style={{ color: "black", fontSize: "1.4em" }} />
                                <h3>{flight.schedule.departureTime}</h3>
                                <p>{flight.route.dep_airport}</p>
                            </div>
                            <div className="column">
                                <BsArrowRight style={{ color: "black", fontSize: "1.8em" }}  />
                                <small>{flight.schedule.travelTime}</small>
                            </div>
                            <div className="column">
                                <MdFlightLand style={{ color: "black", fontSize: "1.4em" }} />
                                <h3>{flight.schedule.arrivalTime}</h3>
                                <p>{flight.route.arr_airport}</p>
                            </div>
                        </div>
                        <div className="airline">
                            {flight.airline}
                        </div>
                    </div>
                )
            })
        }
        </div>
    );
}

export default Flights;
