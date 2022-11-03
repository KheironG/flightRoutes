export type Airport = {
    id: number,
    name: string,
    lat: number,
    lng: number,
    country: string,
    city: string,
    iata: string,
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

export const defaultLocation: Airport = {
    id: 0,
    name: "",
    lat: 0,
    lng: 0,
    country: "",
    city: "",
    iata: ""
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
