import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { ErrorService } from '@services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formError$: Observable<string>;

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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formError$ = this.errorService.getLoginError();
  }

  login(form: FormGroup): void {
    this.authService.login(form);
  }

}