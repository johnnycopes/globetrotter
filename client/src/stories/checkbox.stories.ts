import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select,
} from '@storybook/addon-knobs';

import { CheckboxComponent, TCheckboxState } from 'src/app/shared/components/checkbox/checkbox.component';

const states: TCheckboxState[] = ['checked', 'unchecked', 'indeterminate'];
const actions = {
  onChange: action('ngModelChanged')
};

storiesOf('Shared/Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [CheckboxComponent]
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
  });
