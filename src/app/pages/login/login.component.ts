import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FIREBASE_AUTH_ERRORS } from 'src/app/services/auth/auth.consts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PagesService]
})
export class LoginComponent extends BasePageComponent implements OnInit {
  protected _pageTitle: string = 'Login - Pokemon go pokedex checklist';

  public form: FormGroup<LoginForm>;
  public authError: string;

  constructor(protected pagesService: PagesService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    super(pagesService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public login(form: FormGroup<LoginForm>): void {
    if(this.form.valid) {
      const payload = {
        email: form.get('email').value,
        password: form.get('password').value
      }
      this.authService.login('email', payload)
        .then((user) => {
          if (!!user) {
            this.router.navigate(['/dex']);
          }
        })
        .catch((error) => {
          this.authError = FIREBASE_AUTH_ERRORS[error.code];
        })
    }
  }

}
