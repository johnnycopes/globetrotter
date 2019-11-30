import { Component } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormInput } from 'src/app/shared/model/form-input.interface';
import { FormInputGroup } from 'src/app/shared/model/form-input-group.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  inputs: (FormInput | FormInputGroup)[];

  constructor(private authService: AuthService) { }

  register(form: FormGroup): void {
    this.authService.register(form.value);
  }

  ngOnInit(): void {
    this.inputs = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        validators: [Validators.required]
      },
      {
        groupName: 'password',
        inputs: [
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            validators: [Validators.required]
          },
          {
            name: 'retypePassword',
            type: 'password',
            label: 'Retype Password',
            validators: [Validators.required]
          }
        ]
      }
    ];
  }

  differentPasswordsValidator(password: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const differentPasswords = password !== control.value;
      return differentPasswords ? {'differentPasswords': true} : null;
    }
  }
}
