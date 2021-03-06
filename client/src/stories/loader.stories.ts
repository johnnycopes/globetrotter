import { storiesOf, moduleMetadata } from '@storybook/angular';

import { LoaderComponent } from '@shared/components/loader/loader.component';

storiesOf('Shared/Loader', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent]
    })
  )
  .add('open', () => {
    return {
      component: LoaderComponent
    };
  });
