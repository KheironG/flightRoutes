import { useEffect, useState } from 'react';
import './ui.scss';
import './searchBox.scss';

import { GiWitchFlight } from "react-icons/gi";
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
                        <GiWitchFlight color="#030E6D" fontSize="2em"  />
                        flightRoutes
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
