import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { State } from '@boninger-works/state';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RouterInfo } from '@models/router-info.class';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private readonly state: State<RouterInfo>;

  constructor(private router: Router) {
    this.state = new State(new RouterInfo());
    this.intialize();
  }

  getCurrentRoute(): Observable<string> {
    return this.state.observe(lens => lens.to('currentRoute')).pipe(
      map(currentRoute => currentRoute !== undefined ? currentRoute : '')
    );
  }

  getLoading(): Observable<boolean> {
    return this.state.observe(lens => lens.to('loading')).pipe(
      map(loading => loading !== undefined ? loading : false)
    );
  }

  private intialize(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navigationEnd: NavigationEnd) => {
        const routeUrl = navigationEnd.urlAfterRedirects;
        return routeUrl;
      })
    ).subscribe(
      route => this.state.set(lens => lens.to('currentRoute').set(route))
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
      loading => this.state.set(lens => lens.to('loading').set(loading))
    );
  }

}
