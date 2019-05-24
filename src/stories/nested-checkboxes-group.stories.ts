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
import { NestedCheckboxesGroupComponent } from 'src/app/shared/nested-checkboxes-group/nested-checkboxes-group.component';
import { DefaultTreeProvider } from './mock-data/default-tree-provider.class';
import { DefaultRenderer } from './mock-data/default-renderer.class';
import { MOCK_DATA } from './mock-data/nested-checkboxes-group.data';

const treeProvider = new DefaultTreeProvider;
const renderer = new DefaultRenderer;
const mockItems = MOCK_DATA;
const actions = {
  onModelChange: action('modelChanged')
};
const template = `
  <app-nested-checkboxes-group
    [items]="items"
    [treeProvider]="treeProvider"
    [renderer]="renderer"
    [allChecked]="allChecked"
    [showCounters]="showCounters"
    [showImages]="showImages"
    [displayText]="displayText"
    (modelChanged)="onModelChange($event)"
    >
  </app-nested-checkboxes-group>
`;

storiesOf('Nested Checkboxes Group', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CheckboxComponent,
        CounterComponent,
        NestedCheckboxesComponent,
        NestedCheckboxesGroupComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  )
  .add('none selected', () => {
    return {
      template,
      props: {
        allChecked: boolean('allChecked', false),
        showCounters: boolean('showCounters', true),
        showImages: boolean('showImages', true),
        displayText: text('displayText', 'possible countries selected.'),
        treeProvider,
        renderer,
        items: object('item', mockItems),
        onModelChange: actions.onModelChange
      },
    };
  })
  .add('all selected', () => {
    return {
      template,
      props: {
        allChecked: boolean('allChecked', true),
        showCounters: boolean('showCounters', true),
        showImages: boolean('showImages', true),
        displayText: text('displayText', 'possible countries selected.'),
        treeProvider,
        renderer,
        items: object('item', mockItems),
        onModelChange: actions.onModelChange
      },
    };
  });
