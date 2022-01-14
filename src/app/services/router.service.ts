import { Injectable } from "@angular/core";
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from "@angular/router";
import { State, IStateReadOnly } from "@boninger-works/state/library/core";
import { map, filter } from "rxjs/operators";

interface IRouterState {
  currentRoute: string;
  loading: boolean;
}

@Injectable({
  providedIn: "root"
})
export class RouterService {
  private readonly _state: State<IRouterState> = new State({
    currentRoute: "",
    loading: false
  });
  get state(): IStateReadOnly<IRouterState> {
    return this._state;
  }

  constructor(private _router: Router) {
    this._intialize();
  }

  private _intialize(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navigationEnd: NavigationEnd) => {
        const routeUrl = navigationEnd.urlAfterRedirects;
        return routeUrl;
      })
    ).subscribe(
      route => this._state.set(lens => lens.to("currentRoute").value(route))
    );

    this._router.events.pipe(
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
      loading => this._state.set(lens => lens.to("loading").value(loading))
    );
  }

}
