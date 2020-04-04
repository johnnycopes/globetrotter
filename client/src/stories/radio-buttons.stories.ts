import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs';

import { RadioButtonsComponent, IRadioButtonsOption } from '@shared/components/radio-buttons/radio-buttons.component';

const sampleText = 'Number of countries to include in the quiz:';
const actions = {
  onChange: action('ngModelChanged')
};
const options: IRadioButtonsOption<number>[] = [
  { display: '5', value: 5 },
  { display: '10', value: 10 },
  { display: '15', value: 15 },
  { display: '20', value: 20 },
  { display: 'All', value: 200 }
];
const template = `
  <app-radio-buttons
    [text]="text"
    [alwaysStackedVertically]="alwaysStackedVertically"
    [options]="options"
    [ngModel]="selectedOption"
    (ngModelChange)="onChange($event)"
    >
  </app-radio-buttons>
`;

storiesOf('Shared/Radio Buttons', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [RadioButtonsComponent]
    }),
  )
  .add('none selected', () => {
    return {
      template,
      props: {
        text: text('text', sampleText),
        alwaysStackedVertically: boolean('alwaysStackedVertically', false),
        selectedOption: object('selectedOption', {}),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  })
  .add('first selected', () => {
    return {
      template,
      props: {
        text: text('text', sampleText),
        alwaysStackedVertically: boolean('alwaysStackedVertically', false),
        selectedOption: object('selectedOption', options[0]),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  })
  .add('last selected', () => {
    return {
      template,
      props: {
        text: text('text', sampleText),
        alwaysStackedVertically: boolean('alwaysStackedVertically', false),
        selectedOption: object('selectedOption', options[options.length - 1]),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  })
  .add('stacked vertically', () => {
    return {
      template,
      props: {
        text: text('text', sampleText),
        alwaysStackedVertically: boolean('alwaysStackedVertically', true),
        selectedOption: object('selectedOption', options[0]),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  });
