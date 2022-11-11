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
            <AirportInstance airport={to} />
            <AirportInstance airport={from} />
        </div>
    );
}

export default Airports;
