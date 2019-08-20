import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  object
} from '@storybook/addon-knobs/angular';

import { CounterComponent } from 'src/app/shared/components/counter/counter.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NestedCheckboxesComponent } from 'src/app/shared/components/nested-checkboxes/nested-checkboxes.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { MOCK_DATA, SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';
import markdown from './notes/nested-checkboxes.md';

const treeProvider = new DefaultTreeProvider;
const mockItem = MOCK_DATA;
const noneSelectedDict = {};
const someSelectedDict = SOME_SELECTED_DICT;
const allSelectedDict = ALL_SELECTED_DICT;
const actions = {
  updateCheckboxStates: action('ngModelChange')
};
const template = `
  <app-nested-checkboxes
    [item]="item"
    [treeProvider]="treeProvider"
    [showCounters]="showCounters"
    [showImage]="showImage"
    [ngModel]="checkboxStates"
    (ngModelChange)="updateCheckboxStates($event)"
  ></app-nested-checkboxes>
`;

storiesOf('Shared | Nested Checkboxes', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CheckboxComponent,
        CounterComponent,
        IconComponent,
        NestedCheckboxesComponent
      ]
    })
  )
  .add('none selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImage: boolean('showImage', true),
        checkboxStates: object('checkboxStates', noneSelectedDict),
        item: object('item', mockItem),
        treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    };
  }, { notes: { markdown }})
  .add('some selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImage: boolean('showImage', true),
        checkboxStates: object('checkboxStates', someSelectedDict),
        item: object('item', mockItem),
        treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    };
  }, { notes: { markdown } })
  .add('all selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImage: boolean('showImage', true),
        checkboxStates: object('checkboxStates', allSelectedDict),
        item: object('item', mockItem),
        treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    }
  }, { notes: { markdown } });
