import { useRef, useEffect, useState } from 'react';
import { trpc } from '../../App';
import Map from 'react-map-gl';
import './map.scss';
import type { Airport, Plan } from '../../../../server/src/models/zod'



type Props = {
    from: Airport,
    to: Airport,
    results: Plan | undefined
}

const MapBox = ( { from, to, results } : Props) => {

    const [lng, setLng] = useState(21.064);
    const [lat, setLat] = useState(63.935);
    const [zoom, setZoom] = useState(1.7);

    useEffect(() => {
        if ( to.lng === 0 && to.lat === 0 ) return;
            // map.current.flyTo({ center: [to.lng, to.lat] });
    }, [to]);

    useEffect(() => {
        if ( from.lng === 0 && from.lat === 0 ) return;
            // map.current.flyTo({ center: [from.lng, from.lat] });
    }, [from]);

    useEffect(() => {
        if ( !results ) return;
            // map.current.flyTo({ center: [from.lng, from.lat] });
    }, [results]);

    return (
        <Map
            initialViewState={{
                  longitude: lng,
                  latitude: lat,
                  zoom: zoom
            }}
            style={{ width: "100%", height: "100%", position: "relative", z-index: 1 }}
            mapStyle="mapbox://styles/kheirong/cl8vtq4si00jq14lj9j247rgb"
            projection='globe'
            mapboxAccessToken="pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag"
        />
    );

}

export default MapBox;
