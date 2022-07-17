import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';

export interface Register {
  email?: string;
  password?: string;
  confPassword?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BasePageComponent implements OnInit {
  protected _pageTitle: string = 'Register - Pokemon go pokedex checklist';

  public form;

  constructor(protected pagesService: PagesService, private fb: FormBuilder, private authService: AuthService) {
    super(pagesService);
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confPassword: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public register(formValues: Register): void {
    if(this.form.valid) {
      if(formValues.password === formValues.confPassword) {
        this.authService.register(formValues.email, formValues.password);
      }
    }
  }

}
