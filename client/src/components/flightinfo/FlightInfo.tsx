import { useEffect, useState } from 'react';
import './flightinfo.scss';
import type { Plan } from '../../../../server/src/models/zod';

type Props = {
    plan: Plan | undefined;
};

const FlightInfo = ( { plan } : Props ) => {

    return (
        <div className="plan">

        </div>
    );
}

export default FlightInfo;
