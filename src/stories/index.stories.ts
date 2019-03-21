import { storiesOf } from '@storybook/angular';
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

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Welcome } from '@storybook/angular/demo';
import { ButtonComponent } from '../app/shared/button/button.component';
import { CheckboxComponent } from '../app/shared/checkbox/checkbox.component';
import { FixedSlideablePanelComponent } from '../app/shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from '../app/shared/flip-card/flip-card.component';


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
  .addDecorator(withKnobs)
  .add('fixed slideable panel', () => {
    const positions = ['offscreen', 'header', 'fullscreen'];
    return {
      moduleMetadata: {
        imports: [BrowserAnimationsModule],
        declarations: [FixedSlideablePanelComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
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
        position: radios('position', positions, 'offscreen')
      }
    };
  });

storiesOf('FlipCard', module)
  .addDecorator(withKnobs)
  .add('flipCard', () => {
    const sides = ['front', 'back'];
    return {
      moduleMetadata: {
        imports: [BrowserAnimationsModule],
        declarations: [FlipCardComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      template: `
        <app-flip-card
          [side]="side"
          [disabled]="disabled"
          >
          <app-flip-card-front>
            <img class="quiz-card__flag"
              style="max-width: 200px;"
              [src]="country.flag"
              alt="Flag of {{country.name}}"
            />
          </app-flip-card-front>
          <app-flip-card-back>
            <h3 class="quiz-card__country">
              {{country.name}}
            </h3>
          </app-flip-card-back>
        </app-flip-card>
      `,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: radios('side', sides, 'side'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false)
      },
    }
 });
