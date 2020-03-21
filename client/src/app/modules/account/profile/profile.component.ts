import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Auth } from '@models/auth.class';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  alertMessage: string;
  authData$: Observable<Auth>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.alertMessage = _.get(navigation, "extras.state.alertMessage");
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