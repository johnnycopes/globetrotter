import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { ErrorService } from './core/services/error/error.service';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.loading$ = this.setLoadingState();
    this.error$ = this.errorService.getError();
  }

  private setLoadingState(): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof RouterEvent),
      map((routerEvent: RouterEvent) => {
        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          return false;
        }
        return true;
      }),
      distinctUntilChanged()
    );
  }

}
