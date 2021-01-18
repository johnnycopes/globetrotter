import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "@services/auth.service";
import { IAuth } from "@models/interfaces/auth.interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  public alertMessage: string | undefined;
  public authData$: Observable<IAuth | undefined>;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    const navigation = this._router.getCurrentNavigation();
    this.alertMessage = navigation?.extras?.state?.alertMessage as string;
  }

  public ngOnInit(): void {
    this.authData$ = this._authService.state.observe();
  }

  public logout(): void {
    this._authService.logout();
  }
}
