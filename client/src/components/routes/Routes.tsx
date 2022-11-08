import { useEffect, useState } from 'react';
import './routes.scss';
import type { Route } from '../../../../server/src/models/zod';

type Props = {
    routes: Route[] | undefined;
};

const Routes = ( { routes } : Props ) => {

    return (
        <div className="routes">

        </div>
    );
}

export default Routes;
