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
const template = `
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
`;

storiesOf('Flip Card', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FlipCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  )
  .add('front side', () => {
    return {
      template,
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
    };
  })
  .add('back side', () => {
    return {
      template,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'back'),
        guess: select('guess', guesses, 'none'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false),
        onFlip: actions.onFlip
      }
    };
  })
  .add('correct guess', () => {
    return {
      template,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'back'),
        guess: select('guess', guesses, 'correct'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false),
        onFlip: actions.onFlip
      }
    };
  })
  .add('incorrect guess', () => {
    return {
      template,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'back'),
        guess: select('guess', guesses, 'incorrect'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false),
        onFlip: actions.onFlip
      }
    };
  })
  .add('disabled', () => {
    return {
      template,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'front'),
        guess: select('guess', guesses, 'none'),
        canFlip: boolean('canFlip', false),
        disabled: boolean('disabled', true),
        onFlip: actions.onFlip
      }
    };
  });
