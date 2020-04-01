import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

import { CustomValidators } from '@utility/custom-validators';
import { AuthService } from '@services/auth/auth.service';
import { ErrorService } from '@services/error/error.service';
import { EApi } from '@models/api.enum';
import { map } from 'rxjs/operators';

interface IViewModel {
  formError: string;
  passwordError: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form: FormGroup;
  guidelines: string[];
  vm$: Observable<IViewModel>;
  private formError$: Observable<string>;
  private passwordError$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService
  ) { }

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.form.get('confirmPassword');
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.formError$,
      this.passwordError$
    ]).pipe(
      map(([formError, passwordError]) => ({ formError, passwordError }))
    )
  }

  register(form: FormGroup): void {
    this.authService.register(form);
  }

  private initializeValues(): void {
    this.guidelines = [
      `Password must be between ${EApi.minLength} and ${EApi.maxLength} characters`
    ];
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(EApi.minLength),
        Validators.maxLength(EApi.maxLength)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: CustomValidators.checkPasswords });
  }

  private initializeStreams(): void {
    this.formError$ = this.errorService.errors.observe(lens => lens.to('register'));
    if (this.password) {
      this.passwordError$ = this.authService.getInputError(this.password, 'Password');
    }
  }

}
