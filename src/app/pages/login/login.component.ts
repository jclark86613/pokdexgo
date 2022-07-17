import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

export interface Login {
  email: string;
  password: string;
}
// export type LoginForm = FormGroup<{ [key in keyof Login]: FormControl<string> }>;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PagesService]
})
export class LoginComponent extends BasePageComponent implements OnInit {
  protected _pageTitle: string = 'Login - Pokemon go pokedex checklist';

  public form;

  constructor(protected pagesService: PagesService, private fb: FormBuilder, private authService: AuthService) { super(pagesService); }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(form: Login): void {
    console.log(form);
    if(this.form.valid) {
      this.authService.login('email', form);
    }
  }

}
