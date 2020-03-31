import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Store } from '@models/store.class';
import { RouterInfo } from '@models/router-info.class';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private readonly store: Store;

  constructor(private router: Router) {
    this.store = new Store(new RouterInfo());
    this.intialize();
  }

  getCurrentRoute(): Observable<string> {
    return this.store.get(['currentRoute']);
  }

  getLoading(): Observable<boolean> {
    return this.store.get(['loading']);
  }

  private intialize(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navigationEnd: NavigationEnd) => {
        const routeUrl = navigationEnd.urlAfterRedirects;
        return routeUrl;
      })
    ).subscribe(
      route => this.store.set(['currentRoute'], route)
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
      loading => this.store.set(['loading'], loading)
    );
  }

}
