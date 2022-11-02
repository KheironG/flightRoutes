import { MouseEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './ui.scss';
import './searchBox.scss';
import './loader.scss';

import { GiCommercialAirplane } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';
import { Airport, direction } from '../../typescript'

type Props = {
    setTo: ( airport: Airport ) => void;
    setFrom: ( airport: Airport ) => void;
};

const Ui = ( { setTo, setFrom } : Props ) => {

    const [ searching, triggerSearch ] = useState(false);
    const suggestions = trpc.getRoutes.useQuery( { from: '', to: '' }, { enabled: false } );

    useEffect(() => {
        if ( searching === true ) {

            return;
        }
    }, [searching] );


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
                    <button onClick={() => triggerSearch(true)}>
                        Find route
                        {searching &&
                            (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
                        }
                    </button>
                </form>
            </div>
            <Results />
        </div>
    );
}
export default Ui;
