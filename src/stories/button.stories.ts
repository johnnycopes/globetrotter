import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  select,
} from '@storybook/addon-knobs';

import { ButtonComponent, TButtonStyle } from '@shared/components/button/button.component';

const buttonStyles: TButtonStyle[] = ['primary', 'secondary'];
const actions = {
  onClick: action('clicked')
};

storiesOf('Shared/Button', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    return {
      component: ButtonComponent,
      props: {
        buttonText: text('buttonText', 'Embark'),
        buttonStyle: select('buttonStyle', buttonStyles, 'primary'),
        disabled: boolean('disabled', false),
        clicked: actions.onClick
      }
    }
  })
  .add('secondary', () => {
    return {
      component: ButtonComponent,
      props: {
        buttonText: text('buttonText', 'Select All'),
        buttonStyle: select('buttonStyle', buttonStyles, 'secondary'),
        disabled: boolean('disabled', false),
        clicked: actions.onClick
      }
    };
  });
