import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsetComponent } from 'src/app/shared/tabset/tabset.component';
import { TabComponent } from 'src/app/shared/tab/tab.component';
import { FixedSlideablePanelComponent } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';

const actions = {
  onFlip: action('flipped')
};
const template = `
  <app-tabset [tabsVisibility]="tabsVisibility">
    <div app-tabset-content>
      <app-tab name="Type">
        <h1>type</h1>
      </app-tab>
      <app-tab name="Quantity">
        <h1>quantity</h1>
      </app-tab>
      <app-tab name="Countries">
        <h1>countries</h1>
      </app-tab>
    </div>
  </app-tabset>
`;

storiesOf('Shared | Tabset', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [TabsetComponent, TabComponent, FixedSlideablePanelComponent]
    })
  )
  .add('with default template', () => {
    return {
      template,
      props: {
        tabsVisibility: 'visible'
      }
    };
  })
