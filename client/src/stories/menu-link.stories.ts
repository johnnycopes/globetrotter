import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  text,
  boolean
} from '@storybook/addon-knobs/angular';

import { MenuLinkComponent } from 'src/app/shared/components/menu-link/menu-link.component';
import { FixedSlideablePanelComponent } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Shared | Menu Link', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [MenuLinkComponent, FixedSlideablePanelComponent]
    })
  )
  .add('alone', () => {
    return {
      template: `
        <li appMenuLink
          [name]="name"
          [selected]="selected"
          >
        </li>
      `,
      props: {
        name: text('name', 'Quantity'),
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
            <li appMenuLink
              [name]="name"
              [selected]="selected"
              >
            </li>
          </div>
        </app-fixed-slideable-panel>
      `,
      props: {
        name: text('name', 'Quantity'),
        selected: boolean('selected', true),
      }
    };
  });
