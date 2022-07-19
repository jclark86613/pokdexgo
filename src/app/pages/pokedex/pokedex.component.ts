import { Component } from '@angular/core';
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

  protected _pageTitle: string = 'Pokedex - Pokemon go pokedex checklist';
  constructor(protected pagesService: PagesService) {
    super(pagesService);
  }
}
