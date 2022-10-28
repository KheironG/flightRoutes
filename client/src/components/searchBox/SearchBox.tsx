import { useRef, useEffect, useState } from 'react';
import '../../app.scss';
import './searchBox.scss';

import Autofill from '../autofill/Autofill';

const SearchBox = () => {

    return (
        <div className="search-box">
            <form>
                <Autofill />
                <div className="input-container">
                    <button>Find route</button>
                </div>
            </form>
        </div>

    );

}
export default SearchBox;
