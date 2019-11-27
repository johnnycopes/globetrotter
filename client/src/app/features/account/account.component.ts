import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  checkIfLoggedIn(): boolean {
    return this.authService.checkIfLoggedIn();
  }

}
