import { ChangeEvent, useEffect, useState } from 'react';
import './autofill.scss';
import { trpc } from '../../App';
import Suggestion from '../suggestion/Suggestion';
import { Airport } from '../../typescript'

import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";

type Props = {
    direction: string;
    setAirport: ( airport: Airport ) => void;
    setError: ( error: boolean ) => void;
};

const Autofill = ( { direction, setAirport, setError } : Props ) => {

    const [ query, setQuery ] = useState("");
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    const suggestions = trpc.getSuggestions.useQuery( query, { enabled: false } );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setQuery(event.target.value);
        return;
    }

    const handleOnFocus = ( event: ChangeEvent<HTMLInputElement> ) => {
        setSelected(false);
        setQuery(event.target.value);
        if ( event.target.value.length > 0 ) {
            event.target.select();
        }
        return;
    }

    const setSuggestion = ( airport: Airport ) => {
        const queryString = airport.name + " (" + airport.iata + ")";
        setQuery(queryString);
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
    }, [query] );

    useEffect(() => {
        if ( suggestions.isError ) {
            setError(true);
        }
    }, [suggestions.isError] );

    return (
        <>
            <div className="input-container">
                <div className="input-field">
                    <input type="text" placeholder={direction + " city or aiport"}
                        onInput={handleInputChange}
                        onFocus={handleOnFocus}
                        value={query}
                    />
                    { direction === "from"
                        ? ( <MdFlightTakeoff style={{ fontSize: "1.2em", position: 'absolute', top: '12px', left: '12px' }} /> )
                        : ( <MdFlightLand style={{ fontSize: "1.2em", position: 'absolute', top: '12px', left: '12px' }} /> )
                    }
                </div>
                {showSuggestions && 
                    (<div className="suggestions">
                        {suggestions.data ?
                            ( suggestions.data.length > 0 ?
                                ( suggestions.data.map( ( suggestion ) => {
                                    return( <Suggestion key={suggestion.id} suggestion={suggestion} setSuggestion={setSuggestion} />)
                                    })
                                )
                                : ( null )
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
