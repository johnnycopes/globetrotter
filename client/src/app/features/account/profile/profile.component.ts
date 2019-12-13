import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Auth } from 'src/app/shared/model/auth.class';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authData$: Observable<Auth>;
  firstLogin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.firstLogin = _.get(navigation, "extras.state.firstLogin", false);
  }

  ngOnInit() {
    this.authData$ = this.authService.getData().pipe(
      map(authData => authData)
    );
  }

  logout(): void {
    this.authService.logout();
  }
}