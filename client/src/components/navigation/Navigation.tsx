import './navigation.scss';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

type NavState = {
    one: boolean,
    two: boolean,
    three: boolean,
    four: boolean
}
interface Props {
    flights: boolean;
    aircrafts: boolean;
    setNavState: ( navState: NavState ) => void;
    navState: NavState;
};

const Navigation = ( { flights, aircrafts, setNavState, navState } : Props ) => {

    return (
        <div className="navigation">
            <div className="item" style={{ color: navState.one ? "#024" : "grey" }}
                onClick={() => setNavState({
                    one:true, two:false, three:false, four:false
                })}>
                <RiRouteFill />
                <small>info</small>
            </div>
            { flights &&
                <div className="item" style={{ color: navState.two ? "#024" : "grey" }}
                    onClick={() => setNavState({
                        one:false, two:true, three:false, four:false
                    })}>
                    <RiFlightTakeoffLine />
                    <small>flights</small>
                </div>
            }
            { aircrafts &&
                <div className="item" style={{ color: navState.three ? "#024" : "grey" }}
                    onClick={() => setNavState({
                        one:false, two:false, three:true, four:false
                    })}>
                    <MdFlight />
                    <small>aircraft</small>
                </div>
            }
            <div className="item" style={{ color: navState.four ? "#024" : "grey" }}
                onClick={() => setNavState({
                    one:false, two:false, three:false, four:true
                })}>
                <MdFlight />
                <small>airports</small>
            </div>
        </div>
    );
}

export default Navigation;
