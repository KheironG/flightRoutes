import './airports.scss';
import type { Airport } from '../../../../server/src/models/zod';

import AirportInstance from '../airport/AirportInstance';

type Props = {
    to: Airport,
    from: Airport
};

const Airports = ( { to, from } : Props ) => {
    return (
        <div className="airports">
            <div>
                <h3>Departure airport</h3>
                <AirportInstance airport={from} />
            </div>
            <div>
                <h3>Arrival airport</h3>
                <AirportInstance airport={to} />
            </div>        
        </div>
    );
}

export default Airports;
