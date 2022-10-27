import { useRef, useEffect, useState } from 'react';
import '../../app.scss';
import './searchBox.scss';




const SearchBox = () => {

    return (
        <form id="search-box">
            <div className="input-container">
                <label>From city</label>
                <input type="text"></input>
            </div>
            <div className="input-container">
                <label>To city</label>
                <input type="text"></input>
            </div>
            <div className="input-container">
                <button>Find route</button>
            </div>
        </form>
    );

}
export default SearchBox;
