import type { Route, Airport, Airline } from '../../../server/src/models/zod';

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

export const compileFlights = (
    routes: Route[] | undefined,
    airlines: Airline[] | [],
    distance: number
): Flight[] | [] | undefined => {
    if ( routes !== undefined ) {
        let flights: Flight[] = [];
        console.log('compiling');

        for ( let route of routes ) {
            //If airline name exists is airlines object, return airline name, else return airline IATA code
            const airlineOutput = ( airline: string, airlines: Airline[] | [] ): string => {
                if ( airlines.length > 0 ) {
                    for ( let i = 0; i < airlines.length; i++) {
                        if ( airline == airlines[i].iata ) {
                            return airlines[i].name;
                        }
                    }
                }
                return airline;
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

            //Creates flight object
            const schedule: Schedule = generateSchedule(distance);
            const airline: string = airlineOutput(route.airline, airlines);
            let flight: Flight = {
                route: route,
                schedule: schedule,
                airline: airline
            }
            flights.push(flight);
        }
        return flights;
    }
    return [];
}
