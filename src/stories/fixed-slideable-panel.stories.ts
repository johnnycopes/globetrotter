import { storiesOf } from "@storybook/angular";
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number,
  boolean,
  array,
  select,
  radios,
  color,
  date,
  button,
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { FixedSlideablePanelComponent } from "src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component";

storiesOf('FixedSlideablePanel', module)
  .addDecorator(withKnobs)
  .add('header', () => {
    const positions = ['offscreen', 'header', 'fullscreen'];
    return {
      moduleMetadata: {
        imports: [BrowserAnimationsModule],
        declarations: [FixedSlideablePanelComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      component: FixedSlideablePanelComponent,
      template: `
        <app-fixed-slideable-panel [position]="position">
          <app-fixed-slideable-panel-content>
            I'm the fixed-slideable-panel body content
          </app-fixed-slideable-panel-content>
          <app-fixed-slideable-panel-header>
            I'm the fixed-slideable-panel header content
          </app-fixed-slideable-panel-header>
        </app-fixed-slideable-panel>
      `,
      props: {
        position: select('position', positions, 'header')
      }
    };
  });
