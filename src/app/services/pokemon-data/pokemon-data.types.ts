export interface Pokedex {
    [key: number]: Pokemon;
}

export interface Pokemon {
    id: number;
    name: string;
    generation_number: string;
    stdForms: StdForms;
}

export interface StdForms {
    normal: boolean;
    shiny: boolean;
    perfect: boolean;
    threestar: boolean;
    rocket: boolean;
}
export interface UserPokedex {
    [key: string]: UserPokemon;
}

export interface UserPokemon {
    normal: boolean;
    shiny: boolean;
    perfect: boolean;
    threestar: boolean;
    shadow: boolean;
    purified: boolean;
}

export interface Regions {
    [key: number]: Region;
}

export interface Region {
    id: number;
    name: string;
}
