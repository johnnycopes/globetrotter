import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(model: any): void {
    this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          console.log(user);
          localStorage.setItem('token', user.token);
        }
      })
    ).subscribe(
      () => console.log('logged in successfully'),
      error => console.log(error)
    );
  }

  register(model: any): void {
    this.http.post(this.baseUrl + 'register', model).subscribe(
      () => console.log('registered successfully'),
      error => console.log(error)
    );
  }

  checkIfLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
