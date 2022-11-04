import { useRef, useEffect, useState } from 'react';
import { trpc } from '../../App';
import mapboxgl from 'mapbox-gl';
import './map.scss';
import { Airport } from '../../typescript';

//public acces token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2hlaXJvbmciLCJhIjoiY2w4c25pMXhpMDB0dTN1cG9iYTZoa24xYyJ9.GmTPkKx7TXvPXjmAGsE3Ag';

type Props = {
    from: Airport,
    to: Airport
}

const Map = ( { from, to } : Props) => {

    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState(21.064);
    const [lat, setLat] = useState(63.935);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/kheirong/cl8vtq4si00jq14lj9j247rgb',
            center: [lng, lat],
            zoom: zoom
        });
    });

    const [ plan, setPlan ] = useState();
    const getPlan = trpc.getPlan.useQuery( { from: from.icao, to: to.icao }, { enabled: false } );

    useEffect(() => {
        if ( !to.icao && !from.icao && !plan ) return;
            getPlan.refetch();
            return;
    }, [from, to, plan]);

    console.log(plan);


    useEffect(() => {
        if ( to.lng === 0 && to.lat === 0 ) return;
            map.current.flyTo({ center: [to.lng, to.lat] });
    }, [to]);

    useEffect(() => {
        if ( from.lng === 0 && from.lat === 0 ) return;
            map.current.flyTo({ center: [from.lng, from.lat] });
    }, [from]);

    return (
        <div ref={mapContainer} className='map-container' />
    );

}

export default Map;
