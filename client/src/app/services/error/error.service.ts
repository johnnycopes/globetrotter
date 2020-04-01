import { Injectable } from '@angular/core';
import { State, IStateReadOnly } from '@boninger-works/state';

import { Errors } from '@models/errors.class';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly _errors: State<Errors>;
  get errors(): IStateReadOnly<Errors> {
    return this._errors;
  }

  constructor() {
    this._errors = new State(new Errors());
  }

  setGlobalError(error: string): void {
    this._errors.set(lens => lens.to('global').set(error));
  }

  setLoginError(error: string): void {
    this._errors.set(lens => lens.to('login').set(error));
  }

  setRegisterError(error: string): void {
    this._errors.set(lens => lens.to('register').set(error));
  }
}
