import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

import { Store } from 'src/app/shared/model/store.class';
import { RouterInfo } from 'src/app/shared/model/router-info.class';

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
        const routeUrl = navigationEnd.urlAfterRedirects.split('/')[1];
        return routeUrl;
      })
    ).subscribe(route => this.store.set(['currentRoute'], route));

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
    ).subscribe(loading => this.store.set(['loading'], loading));
  }

}
