import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {
  protected _pageTitle: string = 'Pokedex Go - Pokemon go pokedex checklist';
  protected _pageDescription: string = 'Pokedex checklist for pokemon go. Track pokemons, shinies, luckies and shadows in your collection.';

  constructor(protected pagesService: PagesService){
  }

  ngOnInit(): void {
    this.pagesService.generateMetaTags(this._pageTitle, this._pageDescription);
  }

}
