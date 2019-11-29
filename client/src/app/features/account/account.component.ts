import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loggedIn$: Observable<boolean> = this.authService.getData().pipe(
    map(authData => authData.tokenValid)
  );

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }
}
