import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  object
} from '@storybook/addon-knobs/angular';
import { withNotes } from '@storybook/addon-notes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CounterComponent } from 'src/app/shared/counter/counter.component';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { NestedCheckboxesComponent } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { DefaultRenderer } from './mock-data/default-renderer.class';
import { MOCK_DATA, SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';
import { NESTED_CHECKBOXES_NOTES } from './notes/nested-checkboxes';

const markdown = NESTED_CHECKBOXES_NOTES;
const treeProvider = new DefaultTreeProvider;
const renderer = new DefaultRenderer;
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
    [renderer]="renderer"
    [showCounters]="showCounters"
    [showImage]="showImage"
    [ngModel]="checkboxStates"
    (ngModelChange)="updateCheckboxStates($event)"
  ></app-nested-checkboxes>
`;

storiesOf('Nested Checkboxes', module)
  .addDecorator(withNotes)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CheckboxComponent,
        CounterComponent,
        NestedCheckboxesComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
        renderer,
        updateCheckboxStates: actions.updateCheckboxStates
      },
    };
  }, { notes: { markdown } })
  .add('some selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        showImage: boolean('showImage', true),
        checkboxStates: object('checkboxStates', someSelectedDict),
        item: object('item', mockItem),
        treeProvider,
        renderer,
        updateCheckboxStates: actions.updateCheckboxStates
      },
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
        renderer,
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  }, { notes: { markdown } });
