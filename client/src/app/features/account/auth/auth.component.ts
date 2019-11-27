import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginModel: any = {};
  registerModel: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  login(): void {
    this.authService.login(this.loginModel).subscribe(
      () => console.log('logged in successfully'),
      error => console.log('error', error)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('logged out');
  }

  register(): void {
    console.log(this.registerModel);
  }
}
