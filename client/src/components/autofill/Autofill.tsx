import { ChangeEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './autofill.scss';

const Autofill = () => {

    const [ string, setString ] = useState("");

    const suggestions = trpc.getSuggestions.useQuery( string, { enabled: false });
    console.log(suggestions);


    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setString(event.target.value);
    }

    useEffect(() => {
        if ( string.length > 2 ) {
            suggestions.refetch();
        }
    }, [string]);

    return (
        <div className="autofill-component">
            <div className="input-container">
                <label>From city</label>
                <input type="text" onInput={handleInputChange} />
            </div>
        </div>
    );

}
export default Autofill;
