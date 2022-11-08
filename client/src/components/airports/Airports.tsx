import { useEffect, useState } from 'react';
import './airports.scss';
import type { Airport } from '../../../../server/src/models/zod';

type Props = {
    to: Airport,
    from: Airport
};

const Airports = ( { to, from } : Props ) => {

    return (
        <div className="airports">

        </div>
    );
}

export default Airports;
