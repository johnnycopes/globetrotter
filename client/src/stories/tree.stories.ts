import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs';

import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { NESTED_ITEM } from './mock-data/nested-item.data';
import { NestedItemTreeProvider } from './mock-data/nested-item-tree-provider.class';
import { FLAT_ITEMS } from './mock-data/flat-item.data';
import { FlatItemTreeProvider } from './mock-data/flat-item-tree-provider.class';

const nestedItem = NESTED_ITEM;
const nestedItemTreeProvider = new NestedItemTreeProvider(nestedItem);
const flatItems = FLAT_ITEMS;
const flatItemTreeProvider = new FlatItemTreeProvider(flatItems);

storiesOf('Shared/Tree', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [TreeComponent]
    })
  )
  .add('nested item with default template', () => {
    return {
      template: `
        <app-tree
          [item]="item"
          [treeProvider]="treeProvider"
          >
        </app-tree>
      `,
      props: {
        item: object('item', nestedItem),
        treeProvider: nestedItemTreeProvider
      }
    };
  })
  .add('nested item with custom template', () => {
    return {
      template: `
        <app-tree
          [item]="item"
          [treeProvider]="treeProvider"
          [itemTemplate]="sample"
          >
        </app-tree>

        <ng-template #sample
          let-id="id"
          let-isRoot="isRoot"
          >
          <span [style.fontWeight]="isRoot ? '700' : '300'">
            {{id.toUpperCase()}}
          </span>
        </ng-template>
      `,
      props: {
        item: object('item', nestedItem),
        treeProvider: nestedItemTreeProvider,
      }
    };
  })
  .add('flat item with default template', () => {
    return {
      template: `
        <app-tree
          [item]="item"
          [treeProvider]="treeProvider"
          >
        </app-tree>
      `,
      props: {
        item: object('item', flatItems[0]),
        treeProvider: flatItemTreeProvider
      }
    };
  })
  .add('flat item with custom template', () => {
    return {
      template: `
        <app-tree
          [item]="item"
          [treeProvider]="treeProvider"
          [itemTemplate]="sample"
          >
        </app-tree>

        <ng-template #sample
          let-id="id"
          let-isRoot="isRoot"
          >
          <span [style.fontWeight]="isRoot ? '700' : '300'">
            {{id.toUpperCase()}}
          </span>
        </ng-template>
      `,
      props: {
        item: object('item', flatItems[0]),
        treeProvider: flatItemTreeProvider
      }
    };
  })
