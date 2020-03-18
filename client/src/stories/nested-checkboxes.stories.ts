import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs';

import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { NestedCheckboxesComponent } from 'src/app/shared/components/nested-checkboxes/nested-checkboxes.component';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { SOME_SELECTED_DICT, ALL_SELECTED_DICT } from './mock-data/nested-checkboxes.data';
import { NestedItemTreeProvider } from './mock-data/nested-item-tree-provider.class';
import { NESTED_ITEM } from './mock-data/nested-item.data';

const mockItem = NESTED_ITEM;
const treeProvider = new NestedItemTreeProvider(mockItem);
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
    [ngModel]="checkboxStates"
    (ngModelChange)="updateCheckboxStates($event)"
  ></app-nested-checkboxes>
`;

storiesOf('Shared/Nested Checkboxes', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CheckboxComponent,
        NestedCheckboxesComponent,
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
        updateCheckboxStates: actions.updateCheckboxStates
      }
    }
  });
