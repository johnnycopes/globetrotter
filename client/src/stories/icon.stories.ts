import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  boolean
} from '@storybook/addon-knobs';

import { IconComponent } from 'src/app/shared/components/icon/icon.component';

const icons = [
  'Africa',
  'Americas',
  'Airplane',
  'Asia',
  'Earth',
  'Europe',
  'Globetrotter',
  'Lightbulb',
  'Luggage',
  'Oceania',
  'User'
];
const actions = {
  onClick: action('clicked')
};

storiesOf('Shared/Icon', module)
  .addDecorator(withKnobs)
  .add('Icon', () => {
    return {
      component: IconComponent,
      props: {
        icon: select('icon', icons, 'Earth'),
        highlighted: boolean('highlighted', false),
        clicked: actions.onClick
      }
    }
  })
  .add('Icon highlighted', () => {
    return {
      component: IconComponent,
      props: {
        icon: select('icon', icons, 'Earth'),
        highlighted: boolean('highlighted', true),
        clicked: actions.onClick
      }
    };
  });
