import { useEffect, useState } from 'react';
import { trpc } from '../../App';
import './airport.scss';
import type { Airport, Weather } from '../../../../server/src/models/zod';

type Props = {
    airport: Airport,
};

const AirportInstance = ( { airport } : Props  ) => {

    const [showWeather, setShowWeather ] = useState(false);
    const getWeather = trpc.getWeather.useQuery( airport.icao, { enabled: false } );
    useEffect(() => {
        if ( showWeather ) {
            getWeather.refetch();
        }
    }, [showWeather] );

    const [weather, setWeather ] = useState<Weather | undefined>();
    useEffect(() => {
        if ( getWeather.isSuccess ) {
            setWeather(getWeather.data);
        }
    }, [getWeather] );

    return (
        <div className="airport">
            test
        </div>
    );
}

export default AirportInstance;
