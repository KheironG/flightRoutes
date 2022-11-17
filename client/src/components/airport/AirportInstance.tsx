import { useEffect, useState } from 'react';
import { trpc } from '../../App';
import './airport.scss';
import type { Airport, Weather } from '../../../../server/src/models/zod';

type Props = {
    airport: Airport,
};

import { MdFlight } from "react-icons/md";

const AirportInstance = ( { airport } : Props  ) => {

    const [showWeather, setShowWeather ] = useState(false);
    const getWeather = trpc.getWeather.useQuery( airport.icao, { enabled: false } );
    useEffect(() => {
        if ( showWeather ) {
            getWeather.refetch();
        }
    }, [showWeather] );

    const [weather, setWeather ] = useState<Weather | undefined>(undefined);
    useEffect(() => {
        if ( getWeather.isSuccess ) {
            setWeather(getWeather.data);
        }
    }, [getWeather] );

    return (
        <div className="airport">
            <h5>
                {airport.name}
            </h5>
            <div className="airport-detail">
                <small>
                    iata, icao
                </small>
                <h5>
                    {airport.iata + ", " + airport.icao }
                </h5>
            </div>
            <div className="airport-detail">
                <small>
                    location
                </small>
                <h5>
                    {airport.city + ", " + airport.country + ", " + airport.continent}
                </h5>
            </div>
                {airport.url.length > 0
                    ? <div className="airport-detail">
                            <small>
                                website
                            </small>
                            <h5>
                                <a href={airport.url}>
                                    website
                                </a>
                            </h5>
                      </div>
                     : null
                }
            <div className="container">
                <div className="trigger">
                    <MdFlight />
                </div>
                <div className="weather">
                    test
                </div>
            </div>
        </div>
    );
}

export default AirportInstance;
