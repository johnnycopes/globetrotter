import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs/angular';

import { RadioButtonsComponent, RadioButtonsOption } from "src/app/shared/radio-buttons/radio-buttons.component";

const sampleText = 'Number of countries to include in the quiz:';
const actions = {
  onChange: action('ngModelChanged')
};
const options: RadioButtonsOption<number>[] = [
  { 'display': '5', 'value': 5 },
  { 'display': '10', 'value': 10 },
  { 'display': '15', 'value': 15 },
  { 'display': '20', 'value': 20 },
  { 'display': 'All', 'value': null }
];
const template = `
  <app-radio-buttons
    [text]="text"
    [stackedVertically]="stackedVertically"
    [options]="options"
    [ngModel]="selectedOption"
    (ngModelChange)="onChange($event)"
    >
  </app-radio-buttons>
`;

storiesOf('Shared | Radio Buttons', module)
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
        stackedVertically: boolean('stackedVertically', false),
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
        stackedVertically: boolean('stackedVertically', false),
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
        stackedVertically: boolean('stackedVertically', false),
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
        stackedVertically: boolean('stackedVertically', true),
        selectedOption: object('selectedOption', options[0]),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  });
