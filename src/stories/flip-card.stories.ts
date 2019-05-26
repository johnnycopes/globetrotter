import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FlipCardComponent, FlipCardSide, FlipCardGuess } from 'src/app/shared/flip-card/flip-card.component';

const sides: FlipCardSide[] = ['front', 'back'];
const guesses: FlipCardGuess[] = ['none', 'correct', 'incorrect'];
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
      <img src="https://restcountries.eu/data/usa.svg"
        style="max-width: 200px;"
        alt="USA flag"
      />
    </app-flip-card-front>
    <app-flip-card-back>
      United States of America
    </app-flip-card-back>
  </app-flip-card>
`;

storiesOf('Shared | Flip Card', module)
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
        side: select('side', sides, 'front'),
        guess: select('guess', guesses, 'none'),
        canFlip: boolean('canFlip', false),
        disabled: boolean('disabled', true),
        onFlip: actions.onFlip
      }
    };
  });
