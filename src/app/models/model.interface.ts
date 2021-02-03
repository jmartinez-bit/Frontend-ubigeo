export interface CountryI {
    id:number;
    name: string;
}

export interface CityI {
    id:number;
    countryId: number;
    name: string;
}

export interface Regiones {
    id: number;
    name: string;
}

export interface Provincias {
    id: number;
    name: string;
}