import type { Route } from '../../../server/src/models/zod';

type Codes = {
    airlineCodes: string[]
    aircraftCodes:(string | number)[]
}
export const compileCodes = ( routes: Route[] | undefined ): Codes  => {
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
