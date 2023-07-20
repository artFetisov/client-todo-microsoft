import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentInputFieldName: 'email' | 'password' = 'email'

  constructor(private readonly authService: AuthService, private router: Router) {
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
    this.router.navigate(['/todo'])
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
