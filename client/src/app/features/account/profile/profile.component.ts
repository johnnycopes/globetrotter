import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Auth } from 'src/app/shared/model/auth.class';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authData$: Observable<Auth>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authData$ = this.authService.getData().pipe(
      map(authData => authData)
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
