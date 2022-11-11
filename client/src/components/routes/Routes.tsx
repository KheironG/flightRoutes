import './routes.scss';
import type { Route, Airline } from '../../../../server/src/models/zod';
import { BsArrowRight } from "react-icons/bs";

type Props = {
    routes: Route[];
    airlines: Airline[] | undefined;
};

const Routes = ( { routes, airlines } : Props ) => {

    //If airline name exists is airlines object, return airline name, else return airline IATA code
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

    return (
        <div className="routes">
            {routes.map( ( route ) => {
                const airline: string = airlineOutput( route.airline, airlines);
                return(
                    <div className="route">
                        <div className="details">
                            <h3>{route.dep_airport}</h3>
                            <BsArrowRight />
                            <h3>{route.arr_airport}</h3>
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

export default Routes;
