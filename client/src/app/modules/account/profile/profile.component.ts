import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Auth } from '@models/classes/auth';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  alertMessage: string | undefined;
  authData$: Observable<Auth>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.alertMessage = navigation?.extras?.state?.alertMessage as string;
  }

  ngOnInit(): void {
    this.authData$ = this.authService.authData.observe();
  }

  logout(): void {
    this.authService.logout();
  }
}
