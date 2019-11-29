import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from 'src/environments/environment';
import { Store } from 'src/app/shared/model/store.class';
import { Auth } from 'src/app/shared/model/auth.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly store: Store;
  private baseUrl = environment.baseUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.store = new Store(new Auth('', '', false));
    const token = localStorage.getItem('token');
    if (token) {
      this.setData(token);
    }
  }

  login(model: any): void {
    this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.setData(user.token);
        }
      })
    ).subscribe(
      () => console.log('logged in successfully'),
      error => console.log(error)
    );
  }

  logout(): void {
    this.store.set([], new Auth('', '', false));
    localStorage.removeItem('token');
  }

  register(model: any): void {
    this.http.post(this.baseUrl + 'register', model).subscribe(
      () => console.log('registered successfully'),
      error => console.log(error)
    );
  }

  getData(): Observable<Auth> {
    return this.store.get([]);
  }

  private setData(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const tokenValid = !this.jwtHelper.isTokenExpired(token);
    this.store.set(['username'], decodedToken.unique_name);
    this.store.set(['token'], token);
    this.store.set(['tokenValid'], tokenValid);
    localStorage.setItem('token', token);
  }
}
