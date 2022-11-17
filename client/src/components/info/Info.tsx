import './info.scss';
import { AiOutlineClose } from "react-icons/ai";

type Props = {
    setShowInfo: ( showInfo: boolean ) => void;
}

const Info = ( { setShowInfo } : Props ) => {
    return (
        <div className="app-info">
             <div className="close">
                <AiOutlineClose style={{ fontSize: "1em", color: "white" }} onClick={() => setShowInfo(false)} />
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
