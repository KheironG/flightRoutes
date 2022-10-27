import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import './map.scss';


mapboxgl.accessToken = 'pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag';

const Map = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(21.064);
    const [lat, setLat] = useState(63.935);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/kheirong/cl8vtq4si00jq14lj9j247rgb',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <>
            <div ref={mapContainer} className='map-container' />
        </>
    );

}
export default Map;
