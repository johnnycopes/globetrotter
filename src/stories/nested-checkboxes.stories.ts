import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CounterComponent } from 'src/app/shared/counter/counter.component';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { NestedCheckboxesComponent } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { MOCK_DATA, SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';

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
    [imagePath]="imagePath"
    [ngModel]="checkboxStates"
    (ngModelChange)="updateCheckboxStates($event)"
  ></app-nested-checkboxes>
`;

storiesOf('Nested Checkboxes', module)
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
        imagePath: text('imagePath', 'assets/icons/Miscellaneous.svg'),
        checkboxStates: object('checkboxStates', noneSelectedDict),
        item: object('item', mockItem),
        treeProvider: treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  })
  .add('some selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        imagePath: text('imagePath', 'assets/icons/Miscellaneous.svg'),
        checkboxStates: object('checkboxStates', someSelectedDict),
        item: object('item', mockItem),
        treeProvider: treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  })
  .add('all selected', () => {
    return {
      template,
      props: {
        showCounters: boolean('showCounters', true),
        imagePath: text('imagePath', 'assets/icons/Miscellaneous.svg'),
        checkboxStates: object('checkboxStates', allSelectedDict),
        item: object('item', mockItem),
        treeProvider: treeProvider,
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  });
