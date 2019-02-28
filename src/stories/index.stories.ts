import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
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
} from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';

import { Welcome, Button } from '@storybook/angular/demo';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { FixedSlideablePanelComponent } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipCardComponent } from 'src/app/shared/flip-card/flip-card.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';

storiesOf('Welcome', module)
  .add('to Storybook', () => ({
    component: Welcome,
    props: {},
  }));

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('button', () => {
    const buttonStyles = ['primary', 'secondary'];
    return {
      component: ButtonComponent,
      props: {
        buttonText: 'Start',
        buttonStyle: select('buttonStyle', buttonStyles, 'primary'),
        clicked: action(`clicked!`),
      }
    }
  });

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('checkbox', () => {
    const states = ['checked', 'unchecked', 'indeterminate'];
    return {
      component: CheckboxComponent,
      props: {
        state: select('state', states, 'checked'),
        invertColors: boolean('invertColors', false),
        changed: action(`clicked!`)
      }
    };
  })
  .add('checkbox with label', () => {
    const states = ['checked', 'unchecked', 'indeterminate'];
    return {
      moduleMetadata: {
        declarations: [CheckboxComponent]
      },
      template: `
        <app-checkbox
          [state]="state"
          [invertColors]="invertColors"
          (changed)="onClick()"
          >
          {{label}}
        </app-checkbox>
      `,
      props: {
        label: text('label', `I agree to the terms and conditions`),
        state: select('state', states, 'checked'),
        invertColors: boolean('invertColors', false),
        onClick: action(`clicked!`)
      }
    };
  });

storiesOf('FixedSlideablePanel', module)
  .add('fixed slideable panel', () => ({
    moduleMetadata: {
      imports: [BrowserAnimationsModule],
      declarations: [FixedSlideablePanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    template: `
      <app-fixed-slideable-panel position="header">
        <app-fixed-slideable-panel-content>
          this is a label!
          from storybook: {{position}}
        </app-fixed-slideable-panel-content>
      </app-fixed-slideable-panel>
    `,
    props: {
      position: 'header',
    },
  }));

storiesOf('FlipCard', module).add('flipCard', () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
    declarations: [FlipCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  template: `
    <app-flip-card>
      <app-flip-card-front>
        front side
      </app-flip-card-front>
      <app-flip-card-back>
        back side
      </app-flip-card-back>
    </app-flip-card>
  `,
  props: {
    side: 'front',
  },
}));
