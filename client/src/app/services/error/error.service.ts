import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Store } from '@models/store.class';
import { Error } from '@models/error.class';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly store: Store;

  constructor() {
    this.store = new Store(new Error());
  }

  getGlobalError(): Observable<string> {
    return this.store.get(['globalError']);  }

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
