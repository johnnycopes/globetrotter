import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { first, map } from "rxjs/operators";

interface IErrorState {
  global: string;
  login: string;
  register: string;
}

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  private readonly _errors = new BehaviorSubject<IErrorState>({
    global: "",
    login: "",
    register: ""
  });
  get errors(): BehaviorSubject<IErrorState> {
    return this._errors;
  }

  public setGlobalError(error: string): void {
    this._errors.pipe(
      first(),
      map(errors => ({ ...errors, global: error }))
    ).subscribe();
  }

  public setLoginError(error: string): void {
    this._errors.pipe(
      first(),
      map(errors => ({ ...errors, login: error }))
    ).subscribe();
  }

  public setRegisterError(error: string): void {
    this._errors.pipe(
      first(),
      map(errors => ({ ...errors, register: error }))
    ).subscribe();
  }
}
