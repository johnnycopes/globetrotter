import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Store } from 'src/app/shared/model/store.class';
import { Error } from 'src/app/shared/model/error.class';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly store: Store;

  constructor() {
    this.store = new Store(new Error());
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
