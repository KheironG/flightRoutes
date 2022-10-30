import { ChangeEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './autofill.scss';

import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { MdAirplanemodeActive } from "react-icons/md";

type Props = {
    direction: string;
    setAirport: ( value : object ) => void;
};

const Autofill = ( { direction, setAirport } :Props ) => {

    const [ query, setQuery ] = useState("");
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ selected, setSelected ] = useState(false);
    const suggestions = trpc.getSuggestions.useQuery( query, { enabled: false } );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setQuery(event.target.value);
        return;
    }

    const setSuggestion = ( airport: object ) => {
        setQuery("Stockholm-Arlanda Airport");
        setShowSuggestions(false);
        setSelected(true);
        setAirport(airport);
        return;
    }

    useEffect(() => {
        if ( query.length > 2 ) {
            if ( selected === true ) {
                setShowSuggestions(false);
            } else {
                suggestions.refetch();
                setShowSuggestions(true);
            }
            return;
        }
    }, [query]);

    return (
        <>
            <div className="input-container">
                <div className="input-field">
                    <input type="text" placeholder={direction + " city or aiport"}
                        onInput={handleInputChange}
                        onFocus={() => setSelected(false)}
                        value={query}
                    />
                    { direction === "from" ? ( <MdFlightTakeoff /> ) : ( <MdFlightLand /> ) }
                </div>
                {showSuggestions &&
                    (<div className="suggestions">
                        {suggestions.data ?
                            ( suggestions.data.length > 0 ?
                                ( suggestions.data.map( ( suggestion ) => {
                                    return(
                                            <div className="suggestion" onClick={() => setSuggestion(suggestion)}>
                                                <div className="icon">
                                                    <MdAirplanemodeActive fontSize="1.2em" />
                                                </div>
                                                <div className="info">
                                                    <h5>{suggestion.name}, {suggestion.iata_code}</h5>
                                                    <small>{suggestion.iso_country}</small>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                                : (null)
                            )
                            : ( null )
                        }
                      </div>
                  )}
            </div>
        </>
    );
}
export default Autofill;
