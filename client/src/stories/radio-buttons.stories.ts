import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs/angular';

import { RadioButtonsComponent, RadioButtonsOption } from 'src/app/shared/components/radio-buttons/radio-buttons.component';

const sampleText = 'Number of countries to include in the quiz:';
const actions = {
  onChange: () => action('modelChanged')
};
const options: RadioButtonsOption<number>[] = [
  { display: '5', value: 5 },
  { display: '10', value: 10 },
  { display: '15', value: 15 },
  { display: '20', value: 20 },
  { display: 'All', value: null }
];
const template = `
  <app-radio-buttons
    [text]="text"
    [alwaysStackedVertically]="alwaysStackedVertically"
    [options]="options"
    [model]="model"
    (modelChanged)="onChange($event)"
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
  .add('no model', () => {
    return {
      template,
      props: {
        text: text('text', sampleText),
        alwaysStackedVertically: boolean('alwaysStackedVertically', false),
        model: object('model', {}),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  });
  // .add('first selected', () => {
  //   return {
  //     template,
  //     props: {
  //       text: text('text', sampleText),
  //       alwaysStackedVertically: boolean('alwaysStackedVertically', false),
  //       model: object('model', options[0]),
  //       options: object('options', options),
  //       onChange: actions.onChange
  //     }
  //   };
  // })
  // .add('last selected', () => {
  //   return {
  //     template,
  //     props: {
  //       text: text('text', sampleText),
  //       alwaysStackedVertically: boolean('alwaysStackedVertically', false),
  //       model: object('model', options[options.length - 1]),
  //       options: object('options', options),
  //       onChange: actions.onChange
  //     }
  //   };
  // })
  // .add('stacked vertically', () => {
  //   return {
  //     template,
  //     props: {
  //       text: text('text', sampleText),
  //       alwaysStackedVertically: boolean('alwaysStackedVertically', true),
  //       model: object('model', options[0]),
  //       options: object('options', options),
  //       onChange: actions.onChange
  //     }
  //   };
  // });
