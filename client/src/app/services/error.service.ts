import { Injectable } from "@angular/core";
import { State, IStateReadOnly } from "@boninger-works/state/library/core";

interface IErrorState {
  global: string;
  login: string;
  register: string;
}

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  private readonly _errors = new State<IErrorState>({
    global: "",
    login: "",
    register: ""
  });
  get errors(): IStateReadOnly<IErrorState> {
    return this._errors;
  }

  public setGlobalError(error: string): void {
    this._errors.set(lens => lens.to("global").value(error));
  }

  public setLoginError(error: string): void {
    this._errors.set(lens => lens.to("login").value(error));
  }

  public setRegisterError(error: string): void {
    this._errors.set(lens => lens.to("register").value(error));
  }
}
