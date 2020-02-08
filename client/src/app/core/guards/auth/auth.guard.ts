import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { RouteNames } from 'src/app/shared/model/route-names.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  private authRoute = `${RouteNames.account}/${RouteNames.auth}`;
  private profileRoute = `${RouteNames.account}/${RouteNames.profile}`;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    return this.authService.getData().pipe(
      take(1),
      map(authData => {
        if (authData.tokenValid && state.url === `/${this.authRoute}`) {
          return this.router.createUrlTree([this.profileRoute]);
        }
        else if (!authData.tokenValid && state.url === `/${this.profileRoute}`) {
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
