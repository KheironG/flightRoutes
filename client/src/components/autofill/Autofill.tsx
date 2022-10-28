import { useRef, useEffect, useState } from 'react';
import { trpc } from '../../App';
import './autofill.scss';

const Autofill = () => {

    const [ string, setString ] = useState("");

    const suggestions = trpc.useQuery(['get', string ], { enabled: false });

    useEffect(() => {
        if ( string.length > 2 ) {
            suggestions.refetch();
        }
    }, [string]);

    return (
        <div className="autofill-component">
            <div className="input-container">

                <label>From city</label>
                <input type="text" onInput={() => setString(event.target.value)}></input>
            </div>
        </div>
    );

}
export default Autofill;
