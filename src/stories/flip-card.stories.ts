import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FlipCardComponent } from 'src/app/shared/flip-card/flip-card.component';

const sides = ['front', 'back'];
const guesses = ['none', 'correct', 'incorrect'];
const actions = {
  onFlip: action('flipped')
};

storiesOf('Flip Card', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FlipCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  )
  .add('standard', () => {
    return {
      template: `
        <app-flip-card
          [canFlip]="canFlip"
          [side]="side"
          [guess]="guess"
          [disabled]="disabled"
          (flipped)="onFlip($event)"
          >
          <app-flip-card-front>
            <img
              style="max-width: 200px;"
              [src]="country.flag"
              alt="Flag of {{country.name}}"
            />
          </app-flip-card-front>
          <app-flip-card-back>
            {{country.name}}
          </app-flip-card-back>
        </app-flip-card>
      `,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'front'),
        guess: select('guess', guesses, 'none'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false),
        onFlip: actions.onFlip
      }
    }
 });
