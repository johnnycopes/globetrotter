import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs/angular';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CounterComponent } from 'src/app/shared/components/counter/counter.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { NestedCheckboxesComponent } from 'src/app/shared/components/nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesGroupComponent } from 'src/app/shared/components/nested-checkboxes-group/nested-checkboxes-group.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { DefaultRenderer } from './mock-data/default-renderer.class';
import { MOCK_DATA, SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes-group.data';
import markdown from './notes/nested-checkboxes-group.md';

const treeProvider = new DefaultTreeProvider;
const renderer = new DefaultRenderer;
const mockItems = MOCK_DATA;
const noneSelectedDict = {};
const someSelectedDict = SOME_SELECTED_DICT;
const allSelectedDict = ALL_SELECTED_DICT;
const actions = {
  onModelChange: action('modelChanged')
};
const template = `
  <app-nested-checkboxes-group
    [items]="items"
    [treeProvider]="treeProvider"
    [renderer]="renderer"
    [showCounters]="showCounters"
    [showImages]="showImages"
    [text]="text"
    [ngModel]="checkboxStates"
    (ngModelChange)="onModelChange($event)"
    >
  </app-nested-checkboxes-group>
`;

storiesOf('Shared | Nested Checkboxes Group', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ButtonComponent,
        CheckboxComponent,
        CounterComponent,
        IconComponent,
        NestedCheckboxesComponent,
        NestedCheckboxesGroupComponent
      ]
    })
  )
  .add('none selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImages: boolean('showImages', true),
        text: text('text', 'possible countries selected.'),
        treeProvider,
        renderer,
        checkboxStates: object('checkboxStates', noneSelectedDict),
        items: object('item', mockItems),
        onModelChange: actions.onModelChange
      }
    };
  }, { notes: { markdown } })
  .add('some selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImages: boolean('showImages', true),
        text: text('text', 'possible countries selected.'),
        treeProvider,
        renderer,
        checkboxStates: object('checkboxStates', someSelectedDict),
        items: object('item', mockItems),
        onModelChange: actions.onModelChange
      }
    };
  }, { notes: { markdown } })
  .add('all selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImages: boolean('showImages', true),
        text: text('text', 'possible countries selected.'),
        treeProvider,
        renderer,
        checkboxStates: object('checkboxStates', allSelectedDict),
        items: object('item', mockItems),
        onModelChange: actions.onModelChange
      }
    };
  }, { notes: { markdown } });
