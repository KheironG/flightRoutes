import { useEffect, useState } from 'react';
import './ui.scss';
import './searchBox.scss';

import { GiWitchFlight } from "react-icons/gi";
import Autofill from '../autofill/Autofill';
import Results from '../results/Results';

const Ui = () => {

    const direction: { to: string, from: string } = { to: "to", from: "from" };

    return (
        <div className="UI">
            <div className="search-box">
                <form>
                    <div className="app-logo">
                        <GiWitchFlight color="#030E6D" fontSize="2em"  />
                        flightRoutes
                    </div>
                    <div className="autofill-component from">
                        <Autofill direction={direction.from} />
                    </div>
                    <div className="autofill-component to">
                        <Autofill direction={direction.to}  />
                    </div>
                    <button>Find route</button>
                </form>
            </div>
            <Results />
        </div>
    );
}
export default Ui;
