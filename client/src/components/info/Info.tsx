import './info.scss';
import { GrFormClose } from "react-icons/gr";

type Props = {
    setShowInfo: ( showInfo: boolean ) => void;
}

const Info = ( { setShowInfo } : Props ) => {
    return (
        <div className="info">
             <div className="close">
                <GrFormClose fontSize="1.2em" onClick={() => setShowInfo(false)} />
             </div>
             <small>Flightplan and weather data from:</small>
             <a href="https://flightplandatabase.com">
                <img src="https://static.flightplandatabase.com/images/data-banner/light.min.png"
                    alt="Data from the Flight Plan Database">
                </img>
             </a>
             <small>Airport and airline data from:</small>
             <img src={window.location.origin + '/images/openflights-logo.png'} />
          </div>
    );

}

export default Info;
