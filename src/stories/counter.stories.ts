import { storiesOf } from "@storybook/angular";
import {
  withKnobs,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs/angular';
import { CounterComponent } from "src/app/shared/counter/counter.component";

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .add('standard', () => {
    return {
      component: CounterComponent,
      props: {
        text: text('text', 'possible options selected'),
        current: number('current', 15),
        total: number('total', 15),
        wrapNumbers: boolean('wrapNumbers', false),
        boldNumbers: boolean('boldNumbers', true),
        boldText: boolean('boldText', false),
        textFirst: boolean('textFirst', false)
      }
    }
  });
