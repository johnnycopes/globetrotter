import { Component } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormInput } from 'src/app/shared/model/form-input.interface';
import { FormInputGroup } from 'src/app/shared/model/form-input-group.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  register(form: FormGroup): void {
    this.authService.register(form.value);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  identityRevealedValidator(control: FormGroup): ValidationErrors | null {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');

    return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
  };

  checkPasswords(group: FormGroup): ValidationErrors | null {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { differentPasswords: true }
  }
}
