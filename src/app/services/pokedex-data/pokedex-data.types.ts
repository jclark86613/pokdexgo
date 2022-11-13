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
    [key in STANDARD_POKEMON_FORMS_EMUN]: boolean;
}
export const EMPTY_POKEMON: UserPokemon = {
    [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: false,
    [STANDARD_POKEMON_FORMS_EMUN.SHINY]: false,
    [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: false,
    [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: false,
    [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: false,
    [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: false,
    [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: false,
}

/*
* GLOBAL POKEDEX TO LIST ALL POKEMON AND FORM AVAILABILITY
*/
export interface Pokedex {
    [key: number]: Pokemon;
}
export interface Pokemon {
    id: number;
    name: string;
    generation_number: string;
    stdForms: StdPokemonForms;
}

/*
* POKEDEX COUNT of all available forms
*/
export type PokedexCounts = {
    all: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.KANTO]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.JOHTO]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.HOENN]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.SINNOH]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.UNOVA]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.KALOS]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.ALOLA]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    },
    [REGIONS_ENUM.GALAR]: {
        [key in STANDARD_POKEMON_FORMS_EMUN]: number;
    }
}

export const EMPTY_POKEDEX_COUNT: PokedexCounts = {
    all: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.KANTO]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.JOHTO]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.HOENN]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.SINNOH]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.UNOVA]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.KALOS]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.ALOLA]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    },
    [REGIONS_ENUM.GALAR]: {
        [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
        [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0 
    }
}