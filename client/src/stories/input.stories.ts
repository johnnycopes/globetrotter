import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  text,
  boolean
} from '@storybook/addon-knobs/angular';

import { InputComponent } from 'src/app/shared/components/input/input.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

storiesOf('Shared/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent, AlertComponent]
    })
  )
  .add('text', () => {
    return {
      template: `
        <app-input
          [label]="label"
          [errorMessage]="errorMessage"
          [showError]="showError"
          >
          <input
            [id]="label"
            type="text"
          />
        </app-input>
      `,
      props: {
        label: text('label', 'Username'),
        errorMessage: text('errorMessage', 'This field is invalid'),
        showError: boolean('showError', false)
      }
    };
  })
  .add('with error', () => {
    return {
      template: `
        <app-input
          [label]="label"
          [errorMessage]="errorMessage"
          [showError]="showError"
          >
          <input
            [id]="label"
            type="password"
          />
        </app-input>
      `,
      props: {
        label: text('label', 'Password'),
        errorMessage: text('errorMessage', 'This field is required'),
        showError: boolean('showError', true)
      }
    };
  });
