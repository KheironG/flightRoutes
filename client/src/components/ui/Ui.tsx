import { MouseEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './ui.scss';
import './searchBox.scss';
import './loader.scss';

import { GiCommercialAirplane } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';
import { direction } from '../../typescript'
import type { Airport, Route } from '../../../../server/src/models/zod'

type Props = {
    to: Airport;
    setTo: ( airport: Airport ) => void;
    from: Airport;
    setFrom: ( airport: Airport ) => void;
};

const Ui = ( { setTo, setFrom, to, from } : Props ) => {

    const [ searching, triggerSearch ] = useState(false);
    const getRoutes = trpc.getRoutes.useQuery( { from: from.iata, to: to.iata }, { enabled: false } );
    const [ routes, setRoutes ] = useState<Route[] | undefined>();
    console.log(routes);

    const handleOnclick = ( event: MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        triggerSearch(true);
        return;
    }

    useEffect(() => {
        if ( searching === true ) {
            getRoutes.refetch();
            return;
        }
    }, [searching] );

    useEffect(() => {
        if ( getRoutes.isSuccess === true ) {
            triggerSearch(false)
            setRoutes(getRoutes.data);
            return;
        }
    }, [getRoutes.isSuccess, getRoutes.isError] );

    return (
        <div className="UI">
            <div className="search-box">
                <div className="app-logo">
                    <GiCommercialAirplane color="#02122c" fontSize="2.2em" />
                    <h3>flightRoutes</h3>
                </div>
                <form>
                    <h4>Explore routes</h4>
                    <div className="autofill-component from">
                        <Autofill direction={direction.from} setAirport={setFrom} />
                    </div>
                    <div className="autofill-component to">
                        <Autofill direction={direction.to} setAirport={setTo} />
                    </div>
                    <button onClick={handleOnclick}>
                        Find route
                        {searching &&
                            (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
                        }
                    </button>
                </form>
            </div>
            <Results routes={routes} />
        </div>
    );
}

export default Ui;
