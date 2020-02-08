import { storiesOf, moduleMetadata } from '@storybook/angular';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

storiesOf('Shared/Container', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ContainerComponent, IconComponent]
    })
  )
  .add('split in thirds', () => {
    return {
      template: `
        <app-container>
          <p left>
            Left content
          </p>
          <h1 center>
            Center content
          </h1>
          <p right>
            Right content
          </p>
        </app-container>
      `,
    };
  });
