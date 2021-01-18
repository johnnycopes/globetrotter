import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';
import { ERoute } from '@models/enums/route.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private authRoute = `${ERoute.account}/${ERoute.auth}`;
  private profileRoute = `${ERoute.account}/${ERoute.profile}`;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    return this.authService.authData.observe().pipe(
      take(1),
      map(authData => {
        if (authData.tokenValid && state.url === `/${this.authRoute}`) {
          return this.router.createUrlTree([this.profileRoute]);
        } else if (!authData.tokenValid && state.url === `/${this.profileRoute}`) {
          return this.router.createUrlTree([this.authRoute]);
        }
        return true;
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
      return this.canActivate(next, state);
  }

}
