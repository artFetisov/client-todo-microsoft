import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {
  }

  goToNextPage() {
    this.router.navigate([this.userService.user ? '/todo' : '/login'])
  }
}
