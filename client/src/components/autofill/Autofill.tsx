import { ChangeEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './autofill.scss';

import Suggestion from '../suggestion/Suggestion';
import { Airport } from '../../typescript'

import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";

type Props = {
    direction: string;
    setAirport: ( airport: Airport ) => void;
};

const Autofill = ( { direction, setAirport } :Props ) => {

    console.log('test');


    const [ query, setQuery ] = useState("");
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ selected, setSelected ] = useState(false);
    const suggestions = trpc.getSuggestions.useQuery( query, { enabled: false } );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setQuery(event.target.value);
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
                                    return( <Suggestion key={suggestion.id} suggestion={suggestion} setSuggestion={setSuggestion} />)
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
