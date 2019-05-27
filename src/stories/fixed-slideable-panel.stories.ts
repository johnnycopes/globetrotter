import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FixedSlideablePanelComponent, FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';

const positions: FixedSlideablePanelPosition[] = ['offscreen', 'header', 'fullscreen'];
const template = `
  <app-fixed-slideable-panel [position]="position">
    <app-fixed-slideable-panel-content>
      Content section (fullscreen)
    </app-fixed-slideable-panel-content>
    <app-fixed-slideable-panel-header>
      Header section (header)
    </app-fixed-slideable-panel-header>
  </app-fixed-slideable-panel>
`;

storiesOf('Shared | Fixed Slideable Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FixedSlideablePanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
