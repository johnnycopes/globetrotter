import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsetComponent, TabsetContentVisibility } from '@shared/components/tabset/tabset.component';
import { TabComponent } from '@shared/components/tabset/tab/tab.component';

const visibilityStates: TabsetContentVisibility[] = ['visible', 'invisible'];
const actions = {
  onAnimationStart: action('animation started'),
  onAnimationFinish: action('animation finished')
};

storiesOf('Shared/Tabset', module)
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
      template: `
        <app-tabset
          [contentVisibility]="contentVisibility"
          (animationStarted)="onAnimationStart($event)"
          (animationFinished)="onAnimationFinish($event)"
          >
          <app-tab name="Type">
            <h1>type content here</h1>
          </app-tab>
          <app-tab name="Quantity">
            <h1>quantity content here</h1>
          </app-tab>
          <app-tab name="Countries">
            <h1>countries content here</h1>
          </app-tab>
        </app-tabset>
      `,
      props: {
        contentVisibility: select('contentVisibility', visibilityStates, 'visible'),
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  });
