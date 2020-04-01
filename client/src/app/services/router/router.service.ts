import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { State, IStateReadOnly } from '@boninger-works/state';
import { map, filter } from 'rxjs/operators';

import { RouterInfo } from '@models/router-info.class';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private readonly _state: State<RouterInfo>;
  get state(): IStateReadOnly<RouterInfo> {
    return this._state;
  }

  constructor(private router: Router) {
    this._state = new State(new RouterInfo());
    this.intialize();
  }

  private intialize(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navigationEnd: NavigationEnd) => {
        const routeUrl = navigationEnd.urlAfterRedirects;
        return routeUrl;
      })
    ).subscribe(
      route => this._state.set(lens => lens.to('currentRoute').set(route))
    );

    this.router.events.pipe(
      filter(event => event instanceof RouterEvent),
      map((routerEvent: RouterEvent) => {
        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          return false;
        }
        return true;
      })
    ).subscribe(
      loading => this._state.set(lens => lens.to('loading').set(loading))
    );
  }

}
