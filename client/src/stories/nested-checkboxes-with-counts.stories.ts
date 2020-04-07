import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs';

import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { NestedCheckboxesComponent } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { TreeComponent } from '@shared/components/tree/tree.component';
import { SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';
import { NestedItemTreeProvider } from './mock-data/nested-item-tree-provider.class';
import { NESTED_ITEM } from './mock-data/nested-item.data';
import { NestedCheckboxesWithCountsComponent } from '@shared/components/nested-checkboxes-with-counts/nested-checkboxes-with-counts.component';

const mockItem = NESTED_ITEM;
const treeProvider = new NestedItemTreeProvider(mockItem);
const noneSelectedDict = {};
const someSelectedDict = SOME_SELECTED_DICT;
const allSelectedDict = ALL_SELECTED_DICT;
const actions = {
  updateCheckboxStates: action('ngModelChange')
};
const template = `
  <app-nested-checkboxes-with-counts class="region__checkboxes"
    [item]="item"
    [treeProvider]="treeProvider"
    [getLeafItemCount]="getLeafItemCount"
    [ngModel]="checkboxStates"
    (ngModelChange)="updateCheckboxStates($event)"
    >
  </app-nested-checkboxes-with-counts>
`;

storiesOf('Shared/Nested Checkboxes With Counts', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CheckboxComponent,
        NestedCheckboxesComponent,
        NestedCheckboxesWithCountsComponent,
        TreeComponent
      ]
    })
  )
  .add('none selected', () => {
    return {
      template,
      props: {
        item: object('item', mockItem),
        treeProvider,
        checkboxStates: object('checkboxStates', noneSelectedDict),
        getLeafItemCount: () => 1,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    };
  })
  .add('some selected', () => {
    return {
      template,
      props: {
        item: object('item', mockItem),
        treeProvider,
        checkboxStates: object('checkboxStates', someSelectedDict),
        getLeafItemCount: () => 1,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    };
  })
  .add('all selected', () => {
    return {
      template,
      props: {
        item: object('item', mockItem),
        treeProvider,
        checkboxStates: object('checkboxStates', allSelectedDict),
        getLeafItemCount: () => 1,
        updateCheckboxStates: actions.updateCheckboxStates
      }
    }
  });
