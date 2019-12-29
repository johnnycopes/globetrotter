import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FixedSlideablePanelComponent, FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';

const positions: FixedSlideablePanelPosition[] = ['offscreen', 'header', 'fullscreen'];
const template = `
  <app-fixed-slideable-panel [position]="position">
    <div app-fixed-slideable-panel-content>
      Content section (fullscreen)
    </div>
    <div app-fixed-slideable-panel-header>
      Header section (header)
    </div>
  </app-fixed-slideable-panel>
`;

storiesOf('Shared | Fixed Slideable Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FixedSlideablePanelComponent]
    })
  )
  .add('offscreen', () => {
    return {
      template,
      props: {
        position: select('position', positions, 'offscreen')
      }
    };
  })
  .add('header', () => {
    return {
      template,
      props: {
        position: select('position', positions, 'header')
      }
    };
  })
  .add('fullscreen', () => {
    return {
      template,
      props: {
        position: select('position', positions, 'fullscreen')
      }
    };
  });
