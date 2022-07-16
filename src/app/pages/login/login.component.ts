import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PagesService]
})
export class LoginComponent extends BasePageComponent {
  protected _pageTitle: string = 'Login - Pokemon go pokedex checklist';
  constructor(protected pagesService: PagesService) {
    super(pagesService);
  }

}
