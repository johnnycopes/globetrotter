import { storiesOf } from "@storybook/angular";
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { FlipCardComponent } from "src/app/shared/flip-card/flip-card.component";

storiesOf('FlipCard', module)
  .addDecorator(withKnobs)
  .add('standard', () => {
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
            <div class="quiz-card__country">
              {{country.name}}
            </div>
          </app-flip-card-back>
        </app-flip-card>
      `,
      props: {
        country: {
          name: 'United States of America',
          flag: 'https://restcountries.eu/data/usa.svg'
        },
        side: select('side', sides, 'side'),
        canFlip: boolean('canFlip', true),
        disabled: boolean('disabled', false)
      },
    }
 });
