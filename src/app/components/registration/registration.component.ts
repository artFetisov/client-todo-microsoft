import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Params, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';
import {IAuthResponse} from 'src/app/shared/data/model/auth';
import {CookieService} from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  users$!: Observable<IAuthResponse[] | null>;
  currentInputFieldName: 'email' | 'password' = 'email';

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.users$ = this.userService.users$;
  }

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(6),
      Validators.max(16),
    ]),
  });

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  setCurrentInputFieldName(name: 'email' | 'password') {
    this.currentInputFieldName = name;
  }

  redirect() {
    const params: Params = this.userService.currentUser$.getValue()
      ? {isLoggedIn: true}
      : {};

    this.router.navigate(['/todo'], {queryParams: params});
  }

  async handleAuth(user: IAuthResponse) {
    this.cookieService.saveTokenStorage(user.tokens);
    const response = await this.authService.authMe();
    if (response?.user && response?.tokens) {
      this.redirect();
    }
  }

  async handleRegistration() {
    this.authService
      .registration({
        email: this.registrationForm.value.email as string,
        password: this.registrationForm.value.password as string,
      })
      .then(() => this.redirect());
  }
}
