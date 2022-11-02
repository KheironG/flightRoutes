export type Airport = {
    id: number,
    name: string,
    lat: number,
    lng: number,
    country: string,
    city: string,
    iata: string,
};

export const defaultLocation: Airport = { id: 0, name: "", lat: 0, lng: 0, country: "", city: "", iata: "" }

export const direction: { to: string, from: string } = { to: "to", from: "from" };
