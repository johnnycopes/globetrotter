import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { Auth } from 'src/app/shared/model/auth.class';
import { fadeIn } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: { timing: AnimationTimes.screenTransition }
        })
      ])
    ])
  ]
})
export class AccountComponent implements OnInit {
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
