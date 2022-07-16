import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public form: FormGroup;

  constructor(protected pagesService: PagesService, private fb: FormBuilder) {
    super(pagesService);
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
    console.log(this.form)
  }

  ngOnIOnit(): void {
  }

  public login(form): void {}

}
