import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/angular';

import { LinkComponent } from 'src/app/shared/components/link/link.component';
import { FixedSlideablePanelComponent } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Shared | Link', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [LinkComponent, FixedSlideablePanelComponent]
    })
  )
  .add('alone', () => {
    return {
      template: `
        <li appLink
          [selected]="selected"
          >
          Type
        </li>
      `,
      props: {
        selected: boolean('selected', true),
      }
    };
  })
  .add('in fixed slideable header', () => {
    return {
      template: `
        <app-fixed-slideable-panel
          position="header"
          >
          <div header
            style="width: 200px"
            >
            <li appLink
              [selected]="selected"
              >
              Quanitity
            </li>
          </div>
        </app-fixed-slideable-panel>
      `,
      props: {
        selected: boolean('selected', true),
      }
    };
  });
