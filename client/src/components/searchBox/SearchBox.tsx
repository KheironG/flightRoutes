import { useRef, useEffect, useState } from 'react';
import './searchBox.scss';
import { GiWitchFlight } from "react-icons/gi";

import Autofill from '../autofill/Autofill';

const SearchBox = () => {

    const direction: { to: string, from: string } = { to: "to", from: "from" };

    return (
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
    );
}
export default SearchBox;
