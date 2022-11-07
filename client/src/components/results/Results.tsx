import { useEffect, useState } from 'react';
import './results.scss';
import type { Route } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

type Props = {
    routes: Route[] | undefined;
};


const Results = ( { routes } : Props ) => {

    return (
        <div className="results">
        <div className="navigation">
            <RiRouteFill fontSize="1.5em" />
            <MdFlight fontSize="1.5em" />
            <RiFlightTakeoffLine fontSize="1.5em" />
        </div>
            {routes &&
                (
                 'test'
                )
            }
        </div>
    );
}
export default Results;
