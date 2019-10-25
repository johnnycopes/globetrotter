import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsetComponent, TabsetContentVisibility } from 'src/app/shared/components/tabset/tabset.component';
import { TabComponent } from 'src/app/shared/components/tabset/tab/tab.component';

const visibilityStates: TabsetContentVisibility[] = ['visible', 'invisible'];
const tabsetWithDefaultControls = `
  <app-tabset [contentVisibility]="contentVisibility">
    <div app-tabset-content>
      <app-tab name="Type">
        <h1>type content here</h1>
      </app-tab>
      <app-tab name="Quantity">
        <h1>quantity content here</h1>
      </app-tab>
      <app-tab name="Countries">
        <h1>countries content here</h1>
      </app-tab>
    </div>
  </app-tabset>
`;

storiesOf('Shared | Tabset', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [
        TabsetComponent,
        TabComponent
      ]
    })
  )
  .add('with default template', () => {
    return {
      template: tabsetWithDefaultControls,
      props: {
        contentVisibility: select('contentVisibility', visibilityStates, 'visible')
      }
    };
  });
