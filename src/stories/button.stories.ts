import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  select,
} from '@storybook/addon-knobs/angular';

import { ButtonComponent } from 'src/app/shared/button/button.component';

const buttonText = 'Embark';
const buttonStyles = ['primary', 'secondary'];
const actions = {
  clicked: action('clicked')
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('standard', () => {
    return {
      component: ButtonComponent,
      props: {
        buttonText: text('buttonText', buttonText),
        buttonStyle: select('buttonStyle', buttonStyles, 'primary'),
        disabled: boolean('disabled', false),
        clicked: actions.clicked
      }
    }
  });
