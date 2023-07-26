import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentInputFieldName: 'email' | 'password' = 'email'

  constructor(private readonly authService: AuthService, private router: Router, private userService: UserService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(6),
      Validators.max(16)
    ])
  })

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  redirect() {
    const params: Params = this.userService.user ? {isLoggedIn: true} : {}

    this.router.navigate(['/todo'], {queryParams: params})
  }

  setCurrentInputFieldName(name: 'email' | 'password') {
    this.currentInputFieldName = name
  }

  handleLogin() {
    this.authService.login({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }).then(() => this.redirect())
  }
}
