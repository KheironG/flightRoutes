import { useEffect, useState } from 'react';
import './ui.scss';
import './searchBox.scss';

import { GiCommercialAirplane } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';
import { Airport } from '../../typescript'

type Props = {
    setTo: ( airport: Airport ) => void;
    setFrom: ( airport: Airport ) => void;
};

const Ui = ( { setTo, setFrom } : Props ) => {

    const direction: { to: string, from: string } = { to: "to", from: "from" };

    return (
        <div className="UI">
            <div className="search-box">
                <div className="app-logo">
                    <GiCommercialAirplane color="#02122c" fontSize="2.2em"  />
                    <h3>flightRoutes</h3>
                </div>
                <form>
                    <h4>Explore routes</h4>
                    <div className="autofill-component from">
                        <Autofill direction={direction.from} setAirport={setFrom} />
                    </div>
                    <div className="autofill-component to">
                        <Autofill direction={direction.to} setAirport={setTo}  />
                    </div>
                    <button>Find route</button>
                </form>
            </div>
            <Results />
        </div>
    );
}
export default Ui;
