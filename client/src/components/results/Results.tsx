import { useEffect, useState } from 'react';
import { MdSearch } from "react-icons/md";
import './results.scss';
import type { Route } from '../../../../server/src/models/zod'

type Props = {
    routes: Route[] | undefined;
};


const Results = ( { routes } : Props ) => {

    return (
        <div className="results">
            {routes &&
                (
                <div className="results-menu">
                    routes
                </div>
                )
            }
        </div>
    );
}
export default Results;
