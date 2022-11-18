import './aircrafts.scss';
import type { Aircraft } from '../../../../server/src/models/zod';

type Props = {
    aircrafts: Aircraft[],
};

const Aircrafts = ( { aircrafts } : Props ) => {
    return (
        <div className="aircrafts">
            <h3>Aircraft on this route</h3>
            {aircrafts.map( ( aircraft ) => {
                return(
                    <div className="aircraft">
                        <img className="aircaft" src={window.location.origin + '/images/aircraft.svg'} />
                        <h4>{aircraft.name}</h4>
                    </div>
                    )
                })
            }
        </div>
    );
}
export default Aircrafts;
