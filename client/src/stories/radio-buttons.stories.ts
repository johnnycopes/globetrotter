import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs';

import { RadioButtonsComponent, IRadioButtonsOption } from '@shared/components/radio-buttons/radio-buttons.component';

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
        selectedOption: object('selectedOption', options[options.length - 1]),
        options: object('options', options),
        onChange: actions.onChange
      }
    };
  });
