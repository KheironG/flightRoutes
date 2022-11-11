import './flightinfo.scss';
import type { Plan } from '../../../../server/src/models/zod';

type Props = {
    plan: Plan | undefined;
};

const FlightInfo = ( { plan } : Props ) => {

    return (
        <div className="plan">
        { plan !== undefined ?
            <>
                <div className="plan-detail">
                    <small>Departs from</small>
                    <h5>{plan.fromName}</h5>
                </div>
                <div className="plan-detail">
                    <small>Arrives at</small>
                    <h5>{plan.toName}</h5>
                </div>
                <div className="plan-detail">
                    <small>Distance</small>
                    <h5>{Math.round(plan.distance)}km</h5>
                </div>
                <div className="plan-detail">
                    <small>Max altitude</small>
                    <h5>{Math.round(plan.maxAltitude)}m</h5>
                </div>
                <div className="plan-detail">
                    <small>Waypoints</small>
                    <h5>{Math.round(plan.waypoints)}</h5>
                </div>
            </>
            :
                <h5>No details available for this route</h5>
            ;
        }

        </div>
    );
}

export default FlightInfo;
