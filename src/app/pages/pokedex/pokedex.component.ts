import { Component } from '@angular/core';
import { Filters } from 'src/app/components/pokedex-table/pokedex-table.types';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent extends BasePageComponent {
  public search: string;
  public regionFilter: number;
  public filters: Filters = [];
//[{type: 'region', values: [regionFilter]},{type: 'name', values: [search]}]
  protected _pageTitle: string = 'Pokedex - Pokemon go pokedex checklist';
  constructor(protected pagesService: PagesService) {
    super(pagesService);
  }
}
