import { ChangeEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './autofill.scss';

const Autofill = () => {

    const [ query, setQuery ] = useState("");
    const suggestions = trpc.getSuggestions.useQuery( query, { enabled: false } );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        if ( query.length > 2 ) { suggestions.refetch();}
    }, [query]);

    return (
        <>
            <div className="input-container">
                <input type="text" onInput={handleInputChange} />
                {suggestions.data ?
                    ( suggestions.data.length > 0 ?
                        ( suggestions.data.map( ( suggestion ) => {
                                return( <h5>{suggestion.name}, {suggestion.iata_code}</h5> )
                            })
                        )
                        : (null)
                    )
                    : ( null )
                }
            
            </div>

        </>
    );

}
export default Autofill;
