import { Component } from '@angular/core';
import { Region } from 'src/app/components/pokedex-filters/pokedex-filters.component';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent extends BasePageComponent {
  public search: string;
  public regionFilter: Region;

  protected _pageTitle: string = 'Pokedex - Pokemon go pokedex checklist';
  constructor(protected pagesService: PagesService) {
    super(pagesService);
  }
}
