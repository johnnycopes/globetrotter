import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { State, IStateReadOnly } from '@boninger-works/state';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as _ from 'lodash';

import { environment } from 'src/environments/environment';
import { ERoute } from '@models/route.enum';
import { EErrorMessage } from '@models/error-message.enum';
import { Auth } from '@models/auth.class';
import { IAuthCreds } from '@models/auth-creds.interface';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth/';
  private jwtHelper = new JwtHelperService();
  private readonly _authData: State<Auth>;
  get authData(): IStateReadOnly<Auth> {
    return this._authData;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) {
    this._authData = new State(new Auth());
    const token = localStorage.getItem('token');
    if (token) {
      this.setData(token);
    }
  }

  login(form: FormGroup, alertMessage = 'Signed in successfully!'): void {
    form.disable();
    const model: IAuthCreds = form.value;
    this.http.post(this.apiUrl + 'login', model).pipe(
      map((response: { token: string }) => {
        if (response) {
          this.setData(response.token);
        }
      })
    ).subscribe(
      () => {
        this.router.navigate(
          [`${ERoute.account}/${ERoute.profile}`],
          { state: { alertMessage } }
        );
        form.reset();
        this.errorService.setLoginError('');
      },
      (error: HttpErrorResponse) => {
        form.enable();
        let message = error.error;
        if (error.status === 401) {
          message = 'Incorrect password';
        }
        this.errorService.setLoginError(message);
      }
    );
  }

  logout(): void {
    this._authData
      .observe(lens => lens.to('tokenExpirationTimer'))
      .pipe(
        tap(timer => clearTimeout(timer))
      );
    this._authData.set(new Auth());
    localStorage.removeItem('token');
    this.router.navigate([`${ERoute.account}/${ERoute.auth}`]);
  }

  register(form: FormGroup): void {
    form.disable();
    const model: IAuthCreds = form.value;
    this.http.post(this.apiUrl + 'register', model).subscribe(
      () => {
        this.login(form, 'Registered successfully!');
        this.errorService.setRegisterError('');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          let message = error.error;
          const multipleErrors = !!(_.get(error, 'error.errors'));
          if (multipleErrors) {
            message = 'Failed to register new account';
          }
          this.errorService.setRegisterError(message);
        }
        form.enable();
      }
    );
  }

  getInputError(input: AbstractControl, inputName: string): Observable<string> {
    return input.statusChanges.pipe(
      startWith(''), // fire observable on load for cases where input is touched but not changed
      map(() => {
        if (input.errors) {
          const inputError = Object.keys(input.errors)[0] as keyof typeof EErrorMessage;
          const errorMessage = `${inputName} is ${EErrorMessage[inputError]}`;
          return errorMessage;
        }
        return '';
      })
    );
  }

  private setData(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const tokenValid = !this.jwtHelper.isTokenExpired(token);
    const tokenExpirationDate = this.jwtHelper.getTokenExpirationDate(token);
    const timeUntilAutoLogout = tokenExpirationDate ? tokenExpirationDate.getTime() - Date.now() : 0;
    const tokenExpirationTimer = window.setTimeout(() => this.logout(), timeUntilAutoLogout);
    this._authData.set({
      username: decodedToken.unique_name,
      token,
      tokenValid,
      tokenExpirationTimer
    });
    localStorage.setItem('token', token);
  }
}
