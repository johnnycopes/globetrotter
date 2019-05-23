import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select,
} from '@storybook/addon-knobs/angular';

import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { CounterComponent } from 'src/app/shared/counter/counter.component';

const states = ['checked', 'unchecked', 'indeterminate'];
const actions = {
  onChange: action('ngModelChanged')
};

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [CheckboxComponent, CounterComponent]
    }),
  )
  .add('alone', () => {
    return {
      template: `
        <app-checkbox
          [invertColors]="invertColors"
          [ngModel]="state"
          (ngModelChange)="onChange($event)"
          >
        </app-checkbox>
      `,
      props: {
        state: select('state', states, 'indeterminate'),
        invertColors: boolean('invertColors', false),
        onChange: actions.onChange
      }
    };
  })
  .add('with text', () => {
    return {
      template: `
        <app-checkbox
          [invertColors]="invertColors"
          ngModel="checked"
          (ngModelChange)="onChange($event)"
          >
          I agree to the terms and conditions
        </app-checkbox>
      `,
      props: {
        invertColors: boolean('invertColors', true),
        onChange: actions.onChange
      }
    };
  })
  .add('with counter', () => {
    return {
      template: `
        <app-checkbox
          [invertColors]="invertColors"
          ngModel="checked"
          (ngModelChange)="onChange($event)"
          >
          <app-counter
            [total]="17"
            text="Western Africa"
            [textFirst]="true"
            [wrapNumbers]="true"
            >
          </app-counter>
        </app-checkbox>
      `,
      props: {
        invertColors: boolean('invertColors', false),
        onChange: actions.onChange
      }
    };
  });