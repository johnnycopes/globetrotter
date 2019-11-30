import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomValidators } from 'src/app/shared/utility/custom-validators';
import { FormInput } from 'src/app/shared/model/form-input.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  inputs: FormInput[];
  guidelines: string[];
  validators: any;

  constructor(
    private authService: AuthService
  ) { }

  register(form: FormGroup): void {
    this.authService.register(form.value);
  }

  ngOnInit(): void {
    this.guidelines = [
      'Username must be between 8 and 20 characters',
      'Password must be between 8 and 20 characters'
    ];
    this.inputs = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        validators: [Validators.required],
        errorMessage: 'Username is required'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password'
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password'
      }
    ];
    this.validators = [
      {
        inputNames: ['password', 'confirmPassword'],
        validator: CustomValidators.checkPasswords,
        errorKey: 'differentPasswords',
        errorMessage: `Passwords don't match`
      }
    ];
  }
}
