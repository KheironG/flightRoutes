import { useRef, useEffect, useState } from 'react';
import './suggestion.scss';
import { MdAirplanemodeActive } from "react-icons/md";

type Suggestion = {
    id: number,
    name: string,
    lat: string | number,
    lng: string | number,
    country: string,
    city: string,
    iata: string,
};

interface Props {
    suggestion: Suggestion,
    setSuggestion: ( value : object ) => void;
};

const Suggestion = ( { suggestion, setSuggestion } :Props ) => {
    return (
        <div className="suggestion" onClick={() => setSuggestion(suggestion)}>
            <div className="icon">
                <MdAirplanemodeActive fontSize="1.2em" />
            </div>
            <div className="info">
                <h5>{suggestion.name} {"(" + suggestion.iata + ")"}</h5>
                <small>{suggestion.country}</small>
            </div>
        </div>
    );
}

export default Suggestion;
