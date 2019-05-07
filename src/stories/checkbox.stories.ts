import { storiesOf } from "@storybook/angular";
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number,
  boolean,
  array,
  select,
  radios,
  color,
  date,
  button,
} from '@storybook/addon-knobs/angular';

import { CheckboxComponent } from "src/app/shared/checkbox/checkbox.component";

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('standard', () => {
    const states = ['checked', 'unchecked', 'indeterminate'];
    return {
      component: CheckboxComponent,
      props: {
        state: select('state', states, states[2]),
        invertColors: boolean('invertColors', false),
        changed: action(`clicked!`)
      }
    };
  })
  .add('with label', () => {
    const states = ['checked', 'unchecked', 'indeterminate'];
    return {
      moduleMetadata: {
        declarations: [CheckboxComponent]
      },
      template: `
        <app-checkbox
          [state]="state"
          [invertColors]="invertColors"
          (changed)="onClick()"
          >
          {{label}}
        </app-checkbox>
      `,
      props: {
        label: text('label', `I agree to the terms and conditions`),
        state: select('state', states, 'checked'),
        invertColors: boolean('invertColors', false),
        onClick: action(`clicked!`)
      }
    };
  });
