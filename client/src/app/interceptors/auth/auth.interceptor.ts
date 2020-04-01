import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.authData.observe().pipe(
      take(1),
      exhaustMap(authData => {
        if (!authData.username) {
          return next.handle(req);
        }
        // TODO: attach the token to requests
        console.log('current username:', authData.username);
        console.log('current request:', req);
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
