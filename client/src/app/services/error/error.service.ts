import { Injectable } from '@angular/core';
import { State, IStateReadOnly } from '@boninger-works/state/library/core';

import { IErrors } from '@models/errors.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly _errors = new State<IErrors>({
    global: '',
    login: '',
    register: ''
  });
  get errors(): IStateReadOnly<IErrors> {
    return this._errors;
  }

  setGlobalError(error: string): void {
    this._errors.set(lens => lens.to('global').value(error));
  }

  setLoginError(error: string): void {
    this._errors.set(lens => lens.to('login').value(error));
  }

  setRegisterError(error: string): void {
    this._errors.set(lens => lens.to('register').value(error));
  }
}
