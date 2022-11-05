import { useEffect, useState, useRef } from 'react';
import { trpc } from '../../App';
import  { Map, Fog  } from 'react-map-gl';
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
    const [easeTo, setEaseTo] = useState(false);

    const map = useRef<any>(null);

    useEffect(() => {
        if ( from.lng !== 0 && from.lat !== 0 && map != null ) {
            map.current.flyTo({ center: [from.lng, from.lat] });
        }
        return;
    }, [from]);

    useEffect(() => {
        if ( to.lng !== 0 && to.lat !== 0 && map != null ) {
            map.current.flyTo({ center: [to.lng, to.lat] });
        };
        return;
    }, [to]);

    useEffect(() => {
        if ( plan !==undefined ) {
            map.current.flyTo({ center: [from.lng, from.lat] });
            setEaseTo(true);
        };
        return;
    }, [from, plan]);

    useEffect(() => {
        if ( easeTo === true ) {
            const timer = setTimeout(() => {
                map.current.easeTo({ center: [to.lng, to.lat], duration: 5000 });
            }, 1500);
            return () => clearTimeout(timer);
        };
        return;
    }, [easeTo]);

    return (
        <Map
            ref={map}
            initialViewState={{ longitude: lng, latitude: lat, zoom: zoom }}
            mapStyle="mapbox://styles/kheirong/cl8vtq4si00jq14lj9j247rgb"
            projection='globe'
            mapboxAccessToken="pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag"
        >
            <AirportMarkers from={from} to={to} />
            {plan !== undefined && plan.route !== null &&
                <FlightPlan plan={plan} to={to} />
            }
        </Map>
    );

}

export default MapBox;
