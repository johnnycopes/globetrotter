import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Store } from 'src/app/shared/model/store.class';
import { Error } from 'src/app/shared/model/error.class';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor {
  private readonly store: Store;

  constructor() {
    this.store = new Store(new Error());
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(error.error.title);
        }
        if (error instanceof HttpErrorResponse) {
          this.store.set(['message'], 'bad bad bad');
          return throwError('bad bad bad');
          // const applicationError = error.headers.get('Application-Error');
          // if (applicationError) {
          //   return throwError(applicationError);
          // }
          // const serverError = error.error;
          // let modelStateErrors = '';
          // if (serverError.errors && typeof serverError.errors === 'object') {
          //   for (const key in serverError.errors) {
          //     if (serverError.errors[key]) {
          //       modelStateErrors += serverError.errors[key] + '\n';
          //     }
          //   }
          // }
          // return throwError(modelStateErrors || serverError || 'Unknown Server Error');
        }
      }),
      tap(() => this.store.set(['message'], 'thing?'))
    );
  }

  getGlobalError(): Observable<string> {
    return this.store.get(['globalError']);
  }

  setGlobalError(error: string): void {
    this.store.set(['globalError'], error);
  }

  getLoginError(): Observable<string> {
    return this.store.get(['loginError']);
  }

  setLoginError(error: string): void {
    this.store.set(['loginError'], error);
  }

  getRegisterError(): Observable<string> {
    return this.store.get(['registerError']);
  }

  setRegisterError(error: string): void {
    this.store.set(['registerError'], error);
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorService,
  multi: true
};
