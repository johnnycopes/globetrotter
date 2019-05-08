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
import { MockTreeProvider } from './mock-tree-provider.class';
import { MOCK_REGION } from './mock-component-data';

const actions = {
  updateCheckboxStates: action('ngModelChange')
};
const treeProvider = new MockTreeProvider;
const region = MOCK_REGION;

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
  .add('standard', () => {
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
        item: object('item', region),
        treeProvider: treeProvider,
        showCounters: boolean('showCounters', true),
        checkboxStates: object('checkboxStates', {}),
        updateCheckboxStates: actions.updateCheckboxStates
      },
    }
  });
