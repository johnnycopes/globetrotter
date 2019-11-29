import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormInput } from 'src/app/shared/model/form-input.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  inputs: FormInput[];

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
        name: 'password',
        type: 'password',
        label: 'Password',
        validators: [Validators.required]
      }
    ];
  }
}
