import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  currentInputFieldName: 'email' | 'password' = 'email'

  constructor(private readonly authService: AuthService, private router: Router) {
  }

  registrationForm = new FormGroup({
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
    return this.registrationForm.get('email')
  }

  get password() {
    return this.registrationForm.get('password')
  }

  setCurrentInputFieldName(name: 'email' | 'password') {
    this.currentInputFieldName = name
  }

  redirect() {
    this.router.navigate(['/todo'])
  }

  async handleRegistration() {
    this.authService.registration({
      email: this.registrationForm.value.email as string,
      password: this.registrationForm.value.password as string
    }).then(() => this.redirect())
  }
}
