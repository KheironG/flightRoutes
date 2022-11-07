import { useEffect, useState } from 'react';
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
                <div className="navigation">
                    <p>test</p>
                    <p>test</p>
                </div>
                )
            }
        </div>
    );
}
export default Results;
