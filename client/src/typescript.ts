export type Airport = {
    id: number,
    type: string,
    name: string,
    lat: number,
    lng: number,
    elevation: number | string,
    continent: string,
    country: string,
    region: string,
    city: string,
    scheduled_service: string,
    icao: string,
    iata: string,
    url: string,
    wikipedia: string,
};



export type Route = {
     airline: string,
     airline_id: number,
     dep_airport: string,
     dep_airport_id: number,
     arr_airport: string,
     arr_airport_id: number,
     codeshare: string,
     stops: number,
     equipment: string | number,
};

export const defaultAirport: Airport = {
    id: 0,
    type: "",
    name: "",
    lat: 0,
    lng: 0,
    elevation: 0,
    continent: "",
    country: "",
    region: "",
    city: "",
    scheduled_service: "",
    icao: "",
    iata: "",
    url: "",
    wikipedia: "",
}

export const defaultRoute: Route = {
    airline: "",
    airline_id: 0,
    dep_airport: "",
    dep_airport_id: 0,
    arr_airport: "",
    arr_airport_id: 0,
    codeshare: "",
    stops: 0,
    equipment: "",
}

export const direction: { to: string, from: string } = { to: "to", from: "from" };
