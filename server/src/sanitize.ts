export const sanitizeIATA = ( iata: string ): string  => {
    return iata.replace(/[^A-Z]+/,'').substr(0,3);
}

export const sanitizeICAO = ( icao: string ): string  => {
    return icao.replace(/[^A-Z]+/,'').substr(0,4);
}

export const sanitizeAirlineIATA = ( iata: string[] ): string[]  => {
    for (let instance of iata) {
        instance.replace(/[^A-Z0-9]+/,'').substr(0,2);
    }
    return iata;
}

export const sanitizeAircraftIATA = ( iata: (string|number)[] ): (string | number)[]  => {
    for (let instance of iata) {
        if ( typeof instance === 'string' ) {
            instance.replace(/[^A-Z0-9]+/,'').substr(0,3);
        }
    }
    return iata;
}

export const sanitizeQuery = ( icao: string ): string  => {
    return icao.replace(/[\!\@\#\$\%\^\*\)\(\+\=\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g,'');
}
