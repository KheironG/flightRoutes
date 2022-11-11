import './navigation.scss';
import type { Route, Plan } from '../../../../server/src/models/zod';

import { RiRouteFill } from "react-icons/ri";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdFlight } from "react-icons/md";

type Props = {
    routes: Route[] | undefined;
    plan: Plan | undefined;
};

const Navigation = ( { routes, plan } : Props ) => {

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
                    <MdFlight />
                    <small>flights</small>
                </div>
                : null
            }
        </div>
    );
}

export default Navigation;
