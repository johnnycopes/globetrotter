import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  select,
} from '@storybook/addon-knobs/angular';

import { ButtonComponent } from 'src/app/shared/button/button.component';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    const buttonText = 'Embark';
    const buttonStyles = ['primary', 'secondary'];
    const disabled = false;
    return {
      component: ButtonComponent,
      props: {
        buttonText: text('buttonText', buttonText),
        buttonStyle: select('buttonStyle', buttonStyles, 'primary'),
        disabled: boolean('disabled', disabled),
        clicked: action('clicked!')
      }
    }
  });
