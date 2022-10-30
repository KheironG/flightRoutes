import { useRef, useEffect, useState } from 'react';
import './ui.scss';

import SearchBox from '../searchBox/SearchBox';
import Results from '../results/Results';

const Ui = () => {
    return (
        <div className="UI">
            <SearchBox />
            <Results />
        </div>
    );
}
export default Ui;
