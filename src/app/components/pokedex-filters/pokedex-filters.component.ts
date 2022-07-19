import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export type Region = 'Kanto' | 'Johto' | 'Hoenn' | 'Sinnoh' | 'Unova' | 'Kalos' | 'Alola' | 'Galar';

export interface RegionFilter {
  id: number;
  name: string;
}
@Component({
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss']
})
export class PokedexFiltersComponent {
  private availableRegions: Region[] = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar'];
  public regionFilter: RegionFilter[] = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() region: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    let id = 1;
    this.regionFilter = this.availableRegions.map(region => {
      return {
        id: id++,
        name: region
      }
    })
  }

  public setRegionFilter(event): void {
    this.region.next(event.value);
  }

  public setSearchFilter(event): void {
    this.search.next(event.target.value.toLowerCase());
  }
}
