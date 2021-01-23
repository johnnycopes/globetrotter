import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthService } from "@services/auth.service";
import { ErrorService } from "@services/error.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formError$: Observable<string>;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _errorService: ErrorService
  ) { }

  public get username(): AbstractControl | null {
    return this.form.get("username");
  }

  public get password(): AbstractControl | null {
    return this.form.get("password");
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.formError$ = this._errorService.errors.observe(lens => lens.to("login"));
  }

  public login(form: FormGroup): void {
    this._authService.login(form);
  }

}
