import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(readonly authService: AuthService) {}

  async ngOnInit() {
    this.isLoading$ = this.authService.isLoading$;
    await this.authService.getAvailableAccounts();
  }
}
