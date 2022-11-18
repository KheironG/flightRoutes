import './footer.scss';


const Footer = ( ) => {
    return (
        <footer>
            <div>
                <h5>
                This application was developed for the purpose of demonstrating MERN stack, tRPC, and API integration skills.
                </h5>
            </div>
            <div>
                <a href="https://flightplandatabase.com">
                   <img src="https://static.flightplandatabase.com/images/data-banner/light.min.png"
                       alt="Data from the Flight Plan Database">
                   </img>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
