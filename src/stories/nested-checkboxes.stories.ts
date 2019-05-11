import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  object
} from '@storybook/addon-knobs/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CounterComponent } from 'src/app/shared/counter/counter.component';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { NestedCheckboxesComponent } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { MOCK_NESTED_CHECKBOXES_DATA, SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';

const actions = {
  updateCheckboxStates: action('ngModelChange')
};
const treeProvider = new DefaultTreeProvider;
const mockItem = MOCK_NESTED_CHECKBOXES_DATA;
const noneSelectedDict = {};
const someSelectedDict = SOME_SELECTED_DICT;
const allSelectedDict = ALL_SELECTED_DICT;

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
      template: `
        <app-nested-checkboxes
          [item]="item"
          [treeProvider]="treeProvider"
          [showCounters]="showCounters"
          [ngModel]="checkboxStates"
          (ngModelChange)="updateCheckboxStates($event)"
        ></app-nested-checkboxes>
      `,
      props: {
        item: object('item', mockItem),
        treeProvider: treeProvider,
        showCounters: boolean('showCounters', true),
        checkboxStates: object('checkboxStates', noneSelectedDict),
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  })
  .add('some selected', () => {
    return {
      template: `
        <app-nested-checkboxes
          [item]="item"
          [treeProvider]="treeProvider"
          [showCounters]="showCounters"
          [ngModel]="checkboxStates"
          (ngModelChange)="updateCheckboxStates($event)"
        ></app-nested-checkboxes>
      `,
      props: {
        item: object('item', mockItem),
        treeProvider: treeProvider,
        showCounters: boolean('showCounters', true),
        checkboxStates: object('checkboxStates', someSelectedDict),
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  })
  .add('all selected', () => {
    return {
      template: `
        <app-nested-checkboxes
          [item]="item"
          [treeProvider]="treeProvider"
          [showCounters]="showCounters"
          [ngModel]="checkboxStates"
          (ngModelChange)="updateCheckboxStates($event)"
        ></app-nested-checkboxes>
      `,
      props: {
        item: object('item', mockItem),
        treeProvider: treeProvider,
        showCounters: boolean('showCounters', true),
        checkboxStates: object('checkboxStates', allSelectedDict),
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  });
