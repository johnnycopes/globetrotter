import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  boolean,
  select
} from '@storybook/addon-knobs';

import { AlertComponent } from '@shared/components/alert/alert.component';

const types = ['success', 'error'];

storiesOf('Shared/Alert', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [AlertComponent]
    })
  )
  .add('success', () => {
    return {
      template: `
      <app-alert
        [type]="type"
        [large]="large"
        >
        Spectacular success!
      </app-alert>
      `,
      props: {
        type: select('type', types, 'success'),
        large: boolean('large', true),
      }
    };
  })
  .add('error', () => {
    return {
      template: `
      <app-alert
        [type]="type"
        [large]="large"
        >
        Catastrophic failure!
      </app-alert>
      `,
      props: {
        type: select('type', types, 'error'),
        large: boolean('large', true),
      }
    };
  })

