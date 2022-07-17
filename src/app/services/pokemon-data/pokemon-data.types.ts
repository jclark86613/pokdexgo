export interface Pokedex {
    [key: string]: Pokemon;
}

export interface Pokemon {
    id: number;
    name: string;
    stdForms: StdForms;
}

export interface StdForms {
    normal: boolean;
    shiny: boolean;
    perfect: boolean;
    threestar: boolean;
    rocket: boolean;
}
