import { useEffect, useState } from 'react';
import './ui.scss';
import './searchBox.scss';

import { GiCommercialAirplane } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';

const Ui = () => {

    const direction: { to: string, from: string } = { to: "to", from: "from" };

    const [ from, setFrom ] = useState({});
    const [ to, setTo ] = useState({});

    return (
        <div className="UI">
            <div className="search-box">
                <form>
                    <div className="app-logo">
                        <GiCommercialAirplane color="#030E6D" fontSize="2.5em"  />
                        <h3>flightRoutes</h3>
                    </div>
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
