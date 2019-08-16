import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs/angular';
import { CounterComponent } from 'src/app/shared/components/counter/counter.component';

storiesOf('Shared | Counter', module)
  .addDecorator(withKnobs)
  .add('alone', () => {
    return {
      component: CounterComponent,
      props: {
        text: text('text', ''),
        current: number('current', 50),
        total: number('total', 50),
        wrapNumbers: boolean('wrapNumbers', true),
        boldNumbers: boolean('boldNumbers', false),
        boldText: boolean('boldText', false),
        textFirst: boolean('textFirst', true)
      }
    };
  })
  .add('with text before', () => {
    return {
      component: CounterComponent,
      props: {
        text: text('text', 'Western Africa'),
        current: number('current', undefined),
        total: number('total', 17),
        wrapNumbers: boolean('wrapNumbers', true),
        boldNumbers: boolean('boldNumbers', false),
        boldText: boolean('boldText', false),
        textFirst: boolean('textFirst', true)
      }
    };
  })
  .add('with text after', () => {
    return {
      component: CounterComponent,
      props: {
        text: text('text', 'possible countries selected.'),
        current: number('current', 250),
        total: number('total', 250),
        wrapNumbers: boolean('wrapNumbers', false),
        boldNumbers: boolean('boldNumbers', true),
        boldText: boolean('boldText', false),
        textFirst: boolean('textFirst', false)
      }
    };
  });
