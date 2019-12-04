import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Animation } from 'src/app/shared/model/animation.enum';
import { Auth } from 'src/app/shared/model/auth.class';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.screenTransition}ms ease-in`, style({ opacity: '1' }))
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
