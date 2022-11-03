import { useEffect, useState } from 'react';
import { MdSearch } from "react-icons/md";
import './results.scss';

import type { Route } from '../../../../server/src/router'

type Props = {
    routes: Route[] | undefined;
};


const Results = ( { routes } : Props ) => {
    console.log(routes);

    return (
        <div className="results">

        </div>
    );
}
export default Results;
