import { MouseEvent, useEffect, useState } from 'react';
import { trpc } from '../../App';

import './ui.scss';
import './searchBox.scss';
import './loader.scss';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiInfo } from "react-icons/fi";

import Autofill from '../autofill/Autofill';
import Bridge from '../bridge/Bridge';
import Info from '../info/Info';

import { direction } from '../../typescript'
import type { Airport, Route, Plan } from '../../../../server/src/models/zod'


type Props = {
    to: Airport;
    setTo: ( airport: Airport ) => void;
    from: Airport;
    setFrom: ( airport: Airport ) => void;
    plan: Plan | undefined;
    setPlan: ( plan: Plan ) => void;
};

const Ui = ( { setTo, setFrom, to, from, plan, setPlan } : Props ) => {

    const [ showInfo, setShowInfo ] = useState(false);

    const [ uiPosition, setUiPosition ] = useState(0);
    const handelUiPosition = () =>  {
        if ( uiPosition === 0 ) {
            setUiPosition(1);
        } else {
            setUiPosition(0);
        }
    }

    console.log(uiPosition);


    const [ loading, setLoading ] = useState(false);
    const handleOnclick = ( event: MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        setLoading(true);
        return;
    }


    //Queries database for routes and flight plan, if searching state = true
    const getRoutes = trpc.getRoutes.useQuery( { from: from.iata, to: to.iata }, { enabled: false } );
    const getPlan = trpc.getPlan.useQuery( { from: from.icao, to: to.icao }, { enabled: false } );
    useEffect(() => {
        if ( loading ) {
            console.log('get plan and routes');
            getRoutes.refetch();
            getPlan.refetch();
            return;
        }
    }, [loading] );


    //Sets routes and plan state if calls to getRoutes and getPlan are successful
    const [ routes, setRoutes ] = useState<Route[] | undefined>();
    const [ results, showResults ] = useState(false);
    useEffect(() => {
        if ( getRoutes.isSuccess === true && getPlan.isSuccess === true && loading ) {
            console.log('set plan and routes');
            setRoutes(getRoutes.data);
            setPlan(getPlan.data[0]);
            setLoading(false);
            return;
        }
    }, [ getRoutes, getPlan, loading ] );

    return (
        <div className={`UI ${uiPosition === 0 ?  "closed" : "open"} `} >
            <div className="toggle" onClick={() => handelUiPosition()}>
                {uiPosition === 0
                    ? <IoMdArrowDropup style={{ color: 'white' }} fontSize="1.2em" />
                    : <IoMdArrowDropdown style={{ color: 'white' }} fontSize="1.2em" />        
                }

            </div>
            <div className="search-box">
                {showInfo &&
                    ( <Info setShowInfo={setShowInfo} /> )
                }
                <form>
                    <div className="header">
                        <h5 className="header">Explore routes</h5>
                        <div className="trigger" onClick={() => setShowInfo(true)}>
                            <FiInfo fontSize="1.2em" />
                        </div>
                    </div>
                    <div className="autofill-component from">
                        <Autofill direction={direction.from} setAirport={setFrom} showInfo={showInfo} />
                    </div>
                    <div className="autofill-component to">
                        <Autofill direction={direction.to} setAirport={setTo} showInfo={showInfo} />
                    </div>
                    <button onClick={handleOnclick}>
                        Find route
                        {loading === true
                            ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            : null
                        }
                    </button>
                </form>
            </div>
            { plan !== undefined
                ? <Bridge routes={routes} to={to} from={from} plan={plan} />
                : null
            }
        </div>
    );
}

export default Ui;
