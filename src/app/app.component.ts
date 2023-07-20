import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading$ = this.authService.isLoading
    this.authService.authMe()
  }
}
