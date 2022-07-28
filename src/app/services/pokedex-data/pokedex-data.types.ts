/*
* REGIONS LIST - SOURCE OF TRUTH
*/
export enum REGIONS_ENUM {
    KANTO = 'kanto',
    JOHTO = 'johto',
    HOENN = 'hoenn',
    SINNOH = 'sinnoh',
    UNOVA = 'unova',
    KALOS = 'kalos',
    ALOLA = 'alola',
    GALAR = 'galar'
}
export const REGIONS_ARRAY = <const> [...Object.values(REGIONS_ENUM)];
export type Region = typeof REGIONS_ARRAY[number];
export interface Regions {
    [key: number]: Region;
}
export interface RegionsDoc {
    [key: number]: {
        id: number,
        name: Region
    };
}


/*
* STADNARD FORMS LIST - SOURCE OF TRUTH
*/
export enum STANDARD_POKEMON_FORMS_EMUN {
    NORMAL = 'normal',
    THREESTAR = 'threestar',
    PERFECT = 'perfect',
    SHINY = 'shiny',
    LUCKY = 'lucky',
    SHADOW = 'shadow',
    PURIFIED = 'purified',
}
export const STANDARD_POKEMON_FORMS_ARRAY = <const> [...Object.values(STANDARD_POKEMON_FORMS_EMUN)];
export type StdPokemonForm = typeof STANDARD_POKEMON_FORMS_ARRAY[number];
export interface StdPokemonForms {
    [key: number]: StdPokemonForm;
}
export interface StdPokemonFormsDoc {
    [key: number]: {
        id: number,
        name: StdPokemonForm
    };
}


/*
* EMPTY POKEMON FOR USER POKEDEX
*/
export interface UserPokedex {
    [key: string]: UserPokemon;
}
export type UserPokemon = {
    [key in STANDARD_POKEMON_FORMS_EMUN]: Boolean;
}
export const EMPTY_POKEMON: UserPokemon = {
    normal: false,
    shiny: false,
    perfect: false,
    lucky: false,
    threestar: false,
    shadow: false,
    purified: false,
}


export interface Pokedex {
    [key: number]: Pokemon;
}
export interface Pokemon {
    id: number;
    name: string;
    generation_number: string;
    stdForms: StdPokemonForms;
}
