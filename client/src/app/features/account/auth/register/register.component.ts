import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

import { CustomValidators } from 'src/app/shared/utility/custom-validators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { Api } from 'src/app/shared/model/api.enum';
import { map } from 'rxjs/operators';

interface ViewModel {
  formError: string;
  passwordError: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  guidelines: string[];
  vm$: Observable<ViewModel>;
  private formError$: Observable<string>;
  private passwordError$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService
  ) { }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl {
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
      `Password must be between ${Api.minLength} and ${Api.maxLength} characters`
    ];
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(Api.minLength),
        Validators.maxLength(Api.maxLength)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: CustomValidators.checkPasswords });
  }

  private initializeStreams(): void {
    this.formError$ = this.errorService.getRegisterError();
    this.passwordError$ = this.authService.getInputError(this.password, 'Password');
  }

}
