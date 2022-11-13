import type { Airline, Aircraft } from '../../../server/src/models/zod';

type Data = {
    airlines: Airline[] | [],
    aircrafts: Aircraft[] | []
}
export const setAirlinesAircrafts = ( airlineResponse: any,  aircraftsResponse: any  ): Data => {
    let data: Data = { airlines: [], aircrafts: [] };
    if ( airlineResponse.isSuccess && aircraftsResponse.isSuccess ) {
        console.log('set aircraft and airlines');
        data.airlines = airlineResponse.data;
        data.aircrafts = aircraftsResponse.data;
        return data;
    }
    return data;
}
