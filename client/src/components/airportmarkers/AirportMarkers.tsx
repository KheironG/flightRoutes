import { Marker } from 'react-map-gl';
import type { Airport } from '../../../../server/src/models/zod'

type Props = {
    from: Airport,
    to: Airport,
}

const AirportMarkers = ( { from, to } : Props ) => {
    return (
        <>
        {from.lng !== 0 &&
            <Marker longitude={from.lng} latitude={from.lat} anchor="center">
                 <img className="airport-marker" src={window.location.origin + '/images/marker.png'} />
            </Marker>
        }
        {to.lng !== 0 &&
            <Marker longitude={to.lng} latitude={to.lat} anchor="center">
                 <img className="airport-marker" src={window.location.origin + '/images/marker.png'} />
            </Marker>
        }
        </>
    );

}

export default AirportMarkers;
