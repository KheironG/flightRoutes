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
            if ( error ) {
                setError(false);
            }
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

    //Error handler for UI, Autofill and Brdige components
    const [ error, setError ] = useState(false);
    useEffect(() => {
        if ( getRoutes.isError || getPlan.isError ) {
            setError(true);
        }
    }, [ getRoutes.isError, getPlan.isError ] );

    return (
        <div className="UI" >
            <div className="search-box" style={{ backgroundImage: "url(/images/noise.png)" }}>
                <form>
                    <div className="header">
                        <h5 className="header">Explore routes</h5>
                    </div>
                    <div className="inputs">
                        <div className="autofill-component from">
                            <Autofill direction={direction.from} setAirport={setFrom} setError={setError} />
                        </div>
                        <div className="autofill-component to">
                            <Autofill direction={direction.to} setAirport={setTo} setError={setError}  />
                        </div>
                        <button onClick={handleOnclick}>
                            Find route
                            {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> }
                        </button>
                    </div>
                </form>
            </div>
            { plan !== undefined
                ? <Bridge routes={routes} to={to} from={from} plan={plan} setError={setError} />
                : null
            }
        </div>
    );
}

export default Ui;
