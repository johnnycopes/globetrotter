import { storiesOf, moduleMetadata } from '@storybook/angular';

import { SmallCapsComponent } from '@shared/components/small-caps/small-caps.component';


storiesOf('Shared/Small Caps', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SmallCapsComponent]
    })
  )
  .add('alone', () => {
    return {
      template: `
        <h3 app-small-caps>
          Content
        </h3>
      `
    };
  });
