import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Observable} from "rxjs";
import {IUser} from "../../../shared/data/model/user";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  user$!: Observable<IUser | null>

  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {
    this.user$ = this.userService.currentUser$
  }

  goToNextPage() {
    this.router.navigate(['login'])
  }
}
