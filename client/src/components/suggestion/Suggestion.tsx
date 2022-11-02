import { useRef, useEffect, useState } from 'react';
import './suggestion.scss';
import { MdAirplanemodeActive } from "react-icons/md";

import { Airport } from '../../typescript'

interface Props {
    suggestion: Airport,
    setSuggestion: ( suggestion : Airport ) => void;
};

const Suggestion = ( { suggestion, setSuggestion } :Props ) => {
    return (
        <div className="suggestion" onClick={() => setSuggestion(suggestion)}>
            <div className="icon">
                <MdAirplanemodeActive style={{ position: 'relative', top: '0px', left: '0px' } } fontSize="1.2em" />
            </div>
            <div className="info">
                <h5>{suggestion.name} {"(" + suggestion.iata + ")"}</h5>
                <small>{suggestion.country}</small>
            </div>
        </div>
    );
}

export default Suggestion;
