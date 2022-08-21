import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BasePageComponent implements OnInit {
  protected _pageTitle: string = 'Pokemon go pokedex checklist';


  constructor(protected pagesService: PagesService) {
    super(pagesService);
  }

  ngOnInit(): void {
  }

}
