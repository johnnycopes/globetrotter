import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";

import { AuthService } from "@services/auth.service";

export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this._authService.state.observe().pipe(
      take(1),
      exhaustMap(authData => {
        if (!authData?.username) {
          return next.handle(req);
        }
        // TODO: attach the token to requests
        console.log("current username:", authData.username);
        console.log("current request:", req);
        return next.handle(req);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
