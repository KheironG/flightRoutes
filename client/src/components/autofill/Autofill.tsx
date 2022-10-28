import { useRef, useEffect, useState } from 'react';
import './autofill.scss';


const Autofill = () => {

    return (
        <div className="autofill-component">
            <div className="input-container">
                <label>From city</label>
                <input type="text"></input>
            </div>
        </div>
    );

}
export default Autofill;
