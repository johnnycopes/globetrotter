import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  text
} from '@storybook/addon-knobs';

import { SmallCapsComponent } from '@shared/components/small-caps/small-caps.component';
import { SmallCapsContentComponent } from '@shared/components/small-caps-content/small-caps-content.component';

storiesOf('Shared/Small Caps Content', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [SmallCapsComponent, SmallCapsContentComponent]
    })
  )
  .add('alone', () => {
    return {
      template: `
        <app-small-caps-content [header]="header">
          <p>Content gets projected between the element tags</p>
        </app-small-caps-content>
      `,
      props: {
        header: text('header', 'Example'),
      }
    };
  });
