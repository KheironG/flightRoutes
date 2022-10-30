import { useRef, useEffect, useState } from 'react';
import './searchBox.scss';
import { GiWitchFlight } from "react-icons/gi";

import Autofill from '../autofill/Autofill';

const SearchBox = () => {
    return (
        <div className="search-box">
            <form>
                <div className="app-logo">
                    <GiWitchFlight color="#030E6D" fontSize="2em"  />
                    flightRoutes
                </div>
                <div className="autofill-component from">
                    <Autofill />
                </div>
                <div className="autofill-component to">
                    <Autofill />
                </div>
                <button>Find route</button>
            </form>
        </div>
    );
}
export default SearchBox;
