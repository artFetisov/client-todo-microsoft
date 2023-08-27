import {Component} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {Observable} from 'rxjs';
import {IAuthResponse} from 'src/app/shared/data/model/auth';
import {CookieService} from 'src/app/shared/services/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  users$: Observable<IAuthResponse[]>;
  currentInputFieldName: 'email' | 'password' = 'email';

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.users$ = this.userService.users$;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(6),
      Validators.max(16),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  redirect() {
    const params: Params = this.userService.currentUser$.getValue()
      ? {isLoggedIn: true}
      : {};

    this.router.navigate(['/todo'], {queryParams: params});
  }

  setCurrentInputFieldName(name: 'email' | 'password') {
    this.currentInputFieldName = name;
  }

  toPassword() {
    this.currentInputFieldName = 'password';
  }

  async handleAuth(user: IAuthResponse) {
    this.cookieService.saveTokenStorage(user.tokens);
    const response = await this.authService.authMe();
    if (response?.user && response?.tokens) {
      this.redirect();
    }
  }

  handleLogin() {
    this.authService
      .login({
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      })
      .then(() => this.redirect());
  }
}
