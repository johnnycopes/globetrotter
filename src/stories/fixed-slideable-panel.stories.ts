import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
  withKnobs,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { FixedSlideablePanelComponent } from "src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component";

const positions = ['offscreen', 'header', 'fullscreen'];

storiesOf('Fixed Slideable Panel', module)
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
      template: `
        <app-fixed-slideable-panel [position]="position">
          <app-fixed-slideable-panel-content>
            Content section (fullscreen)
          </app-fixed-slideable-panel-content>
          <app-fixed-slideable-panel-header>
            Header section (header)
          </app-fixed-slideable-panel-header>
        </app-fixed-slideable-panel>
      `,
      props: {
        position: select('position', positions, 'offscreen')
      }
    };
  })
  .add('header', () => {
    return {
      template: `
        <app-fixed-slideable-panel [position]="position">
          <app-fixed-slideable-panel-header>
            Header only
          </app-fixed-slideable-panel-header>
        </app-fixed-slideable-panel>
      `,
      props: {
        position: select('position', positions, 'header')
      }
    };
  })
  .add('fullscreen', () => {
    return {
      template: `
        <app-fixed-slideable-panel [position]="position">
          <app-fixed-slideable-panel-content>
            Content only
          </app-fixed-slideable-panel-content>
        </app-fixed-slideable-panel>
      `,
      props: {
        position: select('position', positions, 'fullscreen')
      }
    };
  });
