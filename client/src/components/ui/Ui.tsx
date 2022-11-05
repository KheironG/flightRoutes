import { MouseEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './ui.scss';
import './searchBox.scss';
import './loader.scss';

import { GiCommercialAirplane } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';
import { direction } from '../../typescript'
import type { Airport, Route, Plan } from '../../../../server/src/models/zod'

type Props = {
    to: Airport;
    setTo: ( airport: Airport ) => void;
    from: Airport;
    setFrom: ( airport: Airport ) => void;
    plan: Plan | undefined;
    setPlan: ( plan: Plan ) => void;
};

const Ui = ( { setTo, setFrom, to, from, plan, setPlan } : Props ) => {

    const [ searching, triggerSearch ] = useState(false);
    const handleOnclick = ( event: MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        triggerSearch(true);
        return;
    }

    const getRoutes = trpc.getRoutes.useQuery( { from: from.iata, to: to.iata }, { enabled: false } );
    const getPlan = trpc.getPlan.useQuery( { from: from.icao, to: to.icao }, { enabled: false } );
    const [ routes, setRoutes ] = useState<Route[] | undefined>();
    useEffect(() => {
        if ( searching === true ) {
            getRoutes.refetch();
            getPlan.refetch();
            return;
        }
    }, [searching] );

    useEffect(() => {
        if ( getRoutes.isSuccess === true && getPlan.isSuccess === true ) {
            triggerSearch(false)
            setRoutes(getRoutes.data);
            setPlan(getPlan.data[0]);
            return;
        }
    }, [getRoutes, getPlan] );

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
