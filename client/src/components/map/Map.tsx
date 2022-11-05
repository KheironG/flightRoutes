import { useEffect, useState, useRef } from 'react';
import { trpc } from '../../App';
import  { Map  } from 'react-map-gl';
import './map.scss';
import type { Airport, Plan } from '../../../../server/src/models/zod'
import AirportMarkers from '../airportmarkers/AirportMarkers';
import FlightPlan from '../flightplan/FlightPlan';

type Props = {
    from: Airport,
    to: Airport,
    plan: Plan | undefined
}

const MapBox = ( { from, to, plan } : Props) => {

    const [lng, setLng] = useState(21.064);
    const [lat, setLat] = useState(63.935);
    const [zoom, setZoom] = useState(1.7);


    useEffect(() => {
        if ( to.lng === 0 && to.lat === 0  ) return;
            // map.current.flyTo({ center: [to.lng, to.lat] });
    }, [to]);

    useEffect(() => {
        if ( from.lng === 0 && from.lat === 0  ) return;
            // map.current.flyTo({ center: [from.lng, from.lat] });
    }, [from]);

    return (
        <Map
            initialViewState={{ longitude: lng, latitude: lat, zoom: zoom }}
            mapStyle="mapbox://styles/kheirong/cl8vtq4si00jq14lj9j247rgb"
            projection='globe'
            mapboxAccessToken="pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag"
        >
            <AirportMarkers from={from} to={to} />
            {plan !== undefined && plan.route !== null &&
                <FlightPlan plan={plan} />
            }
        </Map>
    );

}

export default MapBox;
