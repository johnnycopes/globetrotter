import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FixedSlideablePanelComponent, FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';

const actions = {
  onAnimationStart: action('animation started'),
  onAnimationFinish: action('animation finished')
};
const positions: FixedSlideablePanelPosition[] = ['offscreen', 'header', 'fullscreen'];
const simpleTemplate = `
  <app-fixed-slideable-panel
    [position]="position"
    (animationStarted)="onAnimationStart($event)"
    (animationFinished)="onAnimationFinish($event)"
    >
    <div header>
      Header section (header)
    </div>
    <div content>
      Content section (fullscreen)
    </div>
  </app-fixed-slideable-panel>
`;
const complexTemplate = `
  <app-fixed-slideable-panel
    [position]="position"
    (animationStarted)="onAnimationStart($event)"
    (animationFinished)="onAnimationFinish($event)"
    >
    <app-container header>
      <p left>
        Left
      </p>
      <h1 center>
        Center
      </h1>
      <p right>
        Right
      </p>
    </app-container>
    <div content>
      Content section (fullscreen)
    </div>
  </app-fixed-slideable-panel>
`;

storiesOf('Shared/Fixed Slideable Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FixedSlideablePanelComponent, ContainerComponent]
    })
  )
  .add('offscreen', () => {
    return {
      template: simpleTemplate,
      props: {
        position: select('position', positions, 'offscreen'),
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  })
  .add('header', () => {
    return {
      template: simpleTemplate,
      props: {
        position: select('position', positions, 'header'),
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  })
  .add('header with container', () => {
    return {
      template: complexTemplate,
      props: {
        position: select('position', positions, 'header'),
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  })
  .add('fullscreen', () => {
    return {
      template: simpleTemplate,
      props: {
        position: select('position', positions, 'fullscreen'),
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  });
