import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidators } from 'src/app/shared/utility/custom-validators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { Api } from 'src/app/shared/model/api.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  guidelines: string[];
  form: FormGroup;
  formError$: Observable<string>;
  passwordError$: Observable<string>;

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
    this.formError$ = this.errorService.getRegisterError();
    this.passwordError$ = this.authService.getInputError(this.password, 'Password');
  }

  register(form: FormGroup): void {
    this.authService.register(form.value);
  }

}
