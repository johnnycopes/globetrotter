import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text
} from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { AlertComponent } from '@shared/components/alert/alert.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormComponent } from '@shared/components/form/form.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SmallCapsComponent } from '@shared/components/small-caps/small-caps.component';

const actions = {
  onSubmit: action('submitted')
};
const formBuilder = new FormBuilder();
const basicForm = formBuilder.group({
  username: [''],
  password: ['']
});
const withValidationForm = formBuilder.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
});

storiesOf('Shared/Form', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        AlertComponent,
        ButtonComponent,
        FormComponent,
        InputComponent,
        SmallCapsComponent
      ],
      imports: [FormsModule, ReactiveFormsModule]
    })
  )
  .add('basic', () => {
    return {
      template: `
        <app-form
          [formGroup]="form"
          [buttonText]="buttonText"
          (submitted)="onSubmit($event)"
          >
          <app-input
            label="username"
            >
            <input
              id="username"
              type="text"
              formControlName="username"
            />
          </app-input>
          <app-input
            label="password"
            >
            <input
              id="password"
              type="password"
              formControlName="password"
            />
          </app-input>
        </app-form>
      `,
      props: {
        form: basicForm,
        buttonText: text('buttonText', 'Sign In'),
        onSubmit: actions.onSubmit
      }
    };
  })
  .add('with validation', () => {
    return {
      template: `
        <app-form
          [formGroup]="form"
          [error]="!form.valid && errorMessage"
          [buttonText]="buttonText"
          (submitted)="onSubmit($event)"
          >
          <app-input
            label="Username"
            errorMessage="Username is required"
            [showError]="!form.get('username').valid"
            >
            <input
              id="Username"
              type="text"
              formControlName="username"
            />
          </app-input>
          <app-input
            label="Password"
            errorMessage="Password is required"
            [showError]="!form.get('password').valid"
            >
            <input
              id="Password"
              type="password"
              formControlName="password"
            />
          </app-input>
        </app-form>
      `,
      props: {
        form: withValidationForm,
        buttonText: text('buttonText', 'Sign In'),
        errorMessage: text('errorMessage', 'All fields must be filled out'),
        onSubmit: actions.onSubmit
      }
    };
  });
