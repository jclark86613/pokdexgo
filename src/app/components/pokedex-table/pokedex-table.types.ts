export enum FILTERS {
    NAME = 'name',
    ID = 'id',
    GENERATION_NUMBER = 'generation_number',
    STANDARD_POKEMON_FORMS = 'stdForm'
}

export const FILTERS_ARRAY = <const> [...Object.values(FILTERS)];

export type Filter = {
    by: typeof FILTERS_ARRAY[number],
    values: string[] | number[];
}

export type Filters = Filter[];