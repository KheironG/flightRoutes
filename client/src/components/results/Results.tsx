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
            <div className="item">
                <RiRouteFill />
                <small>info</small>
            </div>
            <div className="item">
                <MdFlight />
                <small>flights</small>
            </div>
            <div className="item">
                <RiFlightTakeoffLine />
                <small>airports</small>
            </div>
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
