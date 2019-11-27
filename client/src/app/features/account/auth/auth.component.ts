import { Component } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginModel: any = {};
  registerModel: any = {};

  constructor(
    private authService: AuthService
  ) { }

  login(): void {
    this.authService.login(this.loginModel);
  }

  register(): void {
    this.authService.register(this.registerModel);
  }
}
