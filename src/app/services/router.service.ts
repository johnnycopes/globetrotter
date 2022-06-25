import { Injectable } from "@angular/core";
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { map, filter, first, switchMap, distinctUntilChanged } from "rxjs/operators";

interface IRouterState {
  currentRoute: string;
  loading: boolean;
}

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private readonly _state: BehaviorSubject<IRouterState> = new BehaviorSubject({
    currentRoute: "",
    loading: false
  });
  get state(): BehaviorSubject<IRouterState> {
    return this._state;
  }

  constructor(private _router: Router) {
    this._intialize();
  }

  private _intialize(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap((navigationEnd: NavigationEnd) =>  navigationEnd.urlAfterRedirects),
      map(currentRoute => this._state.pipe(
        first(),
        map(state => ({ ...state, currentRoute }))
      ).subscribe(state => this._state.next(state))),
      distinctUntilChanged(),
    ).subscribe();

    this._router.events.pipe(
      filter(event => event instanceof RouterEvent),
      switchMap((routerEvent: RouterEvent) => {
        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
          return of(false);
        }
        return of(true);
      }),
      map(loading => this._state.pipe(
        first(),
        map(state => ({ ...state, loading }))
      ).subscribe(state => this._state.next(state))),
      distinctUntilChanged(),
    ).subscribe();
  }

}
