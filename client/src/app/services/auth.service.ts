import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { State, IStateReadOnly } from "@boninger-works/state/library/core";
import { Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { get } from "lodash-es";

import { environment } from "src/environments/environment";
import { ERoute } from "@models/enums/route.enum";
import { EErrorMessage } from "@models/enums/error-message.enum";
import { Auth } from "@models/classes/auth";
import { IAuthCreds } from "@models/interfaces/auth-creds.interface";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _apiUrl = environment.apiUrl + "auth/";
  private _jwtHelper = new JwtHelperService();
  private readonly _authData = new State<IAuthState>(new Auth());
  get authData(): IStateReadOnly<Auth> {
    return this._authData;
  }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _errorService: ErrorService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      this._setData(token);
    }
  }

  public login(form: FormGroup, alertMessage = "Signed in successfully!"): void {
    form.disable();
    const model = form.value as IAuthCreds;
    this._http.post(this._apiUrl + "login", model).pipe(
      map((response: { token: string }) => {
        if (response) {
          this._setData(response.token);
        }
      })
    ).subscribe(
      () => {
        void this._router.navigate(
          [`${ERoute.account}/${ERoute.profile}`],
          { state: { alertMessage } }
        );
        form.reset();
        this._errorService.setLoginError("");
      },
      (error: HttpErrorResponse) => {
        form.enable();
        let message = error.error as string;
        if (error.status === 401) {
          message = "Incorrect password";
        }
        this._errorService.setLoginError(message);
      }
    );
  }

  public logout(): void {
    this._authData
      .observe(lens => lens.to("tokenExpirationTimer"))
      .pipe(
        tap(timer => clearTimeout(timer))
      );
    this._authData.setRoot(new Auth());
    localStorage.removeItem("token");
    void this._router.navigate([`${ERoute.account}/${ERoute.auth}`]);
  }

  public register(form: FormGroup): void {
    form.disable();
    const model = form.value as IAuthCreds;
    this._http.post(this._apiUrl + "register", model).subscribe(
      () => {
        this.login(form, "Registered successfully!");
        this._errorService.setRegisterError("");
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          let message = error.error as string;
          const multipleErrors = !!(get(error, "error.errors", undefined));
          if (multipleErrors) {
            message = "Failed to register new account";
          }
          this._errorService.setRegisterError(message);
        }
        form.enable();
      }
    );
  }

  public getInputError(input: AbstractControl, inputName: string): Observable<string> {
    return input.statusChanges.pipe(
      startWith(""), // fire observable on load for cases where input is touched but not changed
      map(() => {
        if (input.errors) {
          const inputError = Object.keys(input.errors)[0] as keyof typeof EErrorMessage;
          const errorMessage = `${inputName} is ${EErrorMessage[inputError]}`;
          return errorMessage;
        }
        return "";
      })
    );
  }

  private _setData(token: string): void {
    const decodedToken: { unique_name: string } = this._jwtHelper.decodeToken(token);
    const tokenValid = !this._jwtHelper.isTokenExpired(token);
    const tokenExpirationDate = this._jwtHelper.getTokenExpirationDate(token);
    const timeUntilAutoLogout = tokenExpirationDate ? tokenExpirationDate.getTime() - Date.now() : 0;
    const tokenExpirationTimer = window.setTimeout(() => this.logout(), timeUntilAutoLogout);
    this._authData.setRoot({
      username: decodedToken.unique_name,
      token,
      tokenValid,
      tokenExpirationTimer
    });
    localStorage.setItem("token", token);
  }
}
