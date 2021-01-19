import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";

import { CustomValidators } from "@utility/custom-validators";
import { AuthService } from "@services/auth.service";
import { ErrorService } from "@services/error.service";
import { EApi } from "@models/enums/api.enum";
import { map } from "rxjs/operators";

interface IViewModel {
  formError: string;
  passwordError: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public guidelines: string[];
  public vm$: Observable<IViewModel>;
  private _formError$: Observable<string>;
  private _passwordError$: Observable<string>;

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

  public get confirmPassword(): AbstractControl | null {
    return this.form.get("confirmPassword");
  }

  public ngOnInit(): void {
    this._initializeValues();
    this._initializeStreams();
    this.vm$ = combineLatest([
      this._formError$,
      this._passwordError$
    ]).pipe(
      map(([formError, passwordError]) => ({ formError, passwordError }))
    )
  }

  public register(form: FormGroup): void {
    this._authService.register(form);
  }

  private _initializeValues(): void {
    this.guidelines = [
      `Password must be between ${EApi.minLength} and ${EApi.maxLength} characters`
    ];
    this.form = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", [
        Validators.required,
        Validators.minLength(EApi.minLength),
        Validators.maxLength(EApi.maxLength)
      ]],
      confirmPassword: ["", Validators.required]
    }, { validators: CustomValidators.checkPasswords });
  }

  private _initializeStreams(): void {
    this._formError$ = this._errorService.errors.observe(lens => lens.to("register"));
    if (this.password) {
      this._passwordError$ = this._authService.getInputError(this.password, "Password");
    }
  }

}
