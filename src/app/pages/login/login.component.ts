import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FIREBASE_AUTH_ERRORS } from 'src/app/services/auth/auth.consts';
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

  public form: FormGroup;
  public authError: string;

  constructor(protected pagesService: PagesService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    super(pagesService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
    });
  }

  public login(form: Login): void {
    if(this.form.valid) {
      this.authService.login('email', form)
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
