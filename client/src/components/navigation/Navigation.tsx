import './navigation.scss';
import type { Route, Plan, Aircraft } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
    aircrafts: Aircraft[] | undefined;
};

const Navigation = ( { routes, plan, aircrafts } : Props ) => {

    return (
        <div className="navigation">
            { plan !== undefined
                ? <div className="item">
                    <RiRouteFill />
                    <small>info</small>
                </div>
                : null
            }
            { routes !== undefined
                ? <div className="item">
                    <RiFlightTakeoffLine />
                    <small>flights</small>
                </div>
                : null
            }
            { aircrafts !== undefined
                ? <div className="item">
                    <MdFlight />
                    <small>aircraft</small>
                </div>
                : null
            }
            <div className="item">
                <MdFlight />
                <small>airports</small>
            </div>
        </div>
    );
}

export default Navigation;
