import { Source, Layer, LineLayer } from 'react-map-gl';
import { FeatureCollection } from "geojson";
import type { Plan } from '../../../../server/src/models/zod'

type Props = {
    plan: Plan
}

const FlightPlan = ( { plan } : Props ) => {

    let waypoints: any = [];
    for ( let node of plan!.route!.nodes ) {
        waypoints.push([ node.lon, node.lat ]);
    }

    let planData: GeoJSON.FeatureCollection<any> = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
                type: 'LineString',
                coordinates: waypoints
          },
        }]
    };

    const layerStyle: LineLayer  =  {
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#02122c',
            'line-width': 3
        }
    };

    return (
        <Source id="flight-plan" type="geojson" data={planData}>
            <Layer {...layerStyle} />
        </Source>
    );

}

export default FlightPlan;
