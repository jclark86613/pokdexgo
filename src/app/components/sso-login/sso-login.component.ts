import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FIREBASE_AUTH_ERRORS } from 'src/app/services/auth/auth.consts';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss']
})
export class SsoLoginComponent implements OnInit {

  public buttonGroup = [{
    name: 'Google',
    icon: faGoogle,
    action: () => {
      this.login('google');
    }
  }]
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  private login(provider): void {
    this.authService.login(provider)
    .then((user) => {
      if (!!user) {
        this.router.navigate(['/pokedex']);
      }
    })
  }
}
