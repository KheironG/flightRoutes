import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.scss';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag';

const Map = () => {

    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
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

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    // <div className="sidebar">
    //     Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    // </div>

    return (
        <>
            <div ref={mapContainer} className='map-container' />
        </>
    );

}
export default Map;
