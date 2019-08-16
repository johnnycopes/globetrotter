import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs/angular';

import { IconComponent } from 'src/app/shared/components/icon/icon.component';

const actions = {
  onClick: action('clicked')
};

storiesOf('Shared | Icon', module)
  .addDecorator(withKnobs)
  .add('Earth', () => {
    return {
      component: IconComponent,
      props: {
        path: text('path', 'assets/icons/Earth.svg'),
        description: text('description', 'The blue planet'),
        clicked: actions.onClick
      }
    }
  })
  .add('Australia', () => {
    return {
      component: IconComponent,
      props: {
        path: text('path', 'assets/icons/Oceania.svg'),
        description: text('description', 'The land down under'),
        clicked: actions.onClick
      }
    };
  });
