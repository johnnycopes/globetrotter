import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select
} from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlipCardComponent, FlipCardSide, FlipCardGuess } from 'src/app/shared/components/flip-card/flip-card.component';

const sides: FlipCardSide[] = ['front', 'back'];
const guesses: FlipCardGuess[] = ['none', 'correct', 'incorrect'];
const actions = {
  onFlip: action('flipped'),
  onAnimationStart: action('animation started'),
  onAnimationFinish: action('animation finished')
};
const template = `
  <app-flip-card
    [canFlip]="canFlip"
    [side]="side"
    [guess]="guess"
    [disabled]="disabled"
    (flipped)="onFlip($event)"
    (animationStarted)="onAnimationStart($event)"
    (animationFinished)="onAnimationFinish($event)"
    >
    <div app-flip-card-front>
      <img src="https://restcountries.eu/data/usa.svg"
        style="max-width: 200px;"
        alt="USA flag"
      />
    </div>
    <div app-flip-card-back>
      United States of America
    </div>
  </app-flip-card>
`;

storiesOf('Shared/Flip Card', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [FlipCardComponent]
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
        onFlip: actions.onFlip,
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
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
        onFlip: actions.onFlip,
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
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
        onFlip: actions.onFlip,
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
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
        onFlip: actions.onFlip,
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
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
        onFlip: actions.onFlip,
        onAnimationStart: actions.onAnimationStart,
        onAnimationFinish: actions.onAnimationFinish
      }
    };
  });
