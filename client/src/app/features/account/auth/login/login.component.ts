import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormInput } from 'src/app/shared/model/form-input.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputs: FormInput[];
  guidelines: string[];
  validators: any;

  constructor(private authService: AuthService) { }

  login(form: FormGroup): void {
    this.authService.login(form.value);
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
        label: 'Password',
        validators: [Validators.required],
        errorMessage: 'Password is required'
      }
    ];
  }
}
