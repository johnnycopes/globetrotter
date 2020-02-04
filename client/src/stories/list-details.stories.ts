import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs/angular';

import { MOCK_DATA } from './mock-data/list-details.data';
import { ListDetailsComponent } from 'src/app/shared/components/list-details/list-details.component';

const actions = {
  onSelect: action('selected')
};

storiesOf('Shared | List Details', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [ListDetailsComponent]
    })
  )
  .add('basic', () => {
    return {
      template: `
        <ng-template #listItemTemplate
          let-country
          >
          {{country.name}}
        </ng-template>

        <ng-template #detailsTemplate
          let-country>
          <h1 style="font-size: 56px">
            {{country.name}}
          </h1>
          <h2 style="margin: 12px 0 24px">
            {{country.capital}}
          </h2>
          <img [src]="country.flag" style="max-width: 300px">
        </ng-template>

        <app-list-details
          [items]="items"
          [selectedItem]="items[0]"
          uniqueKey="cioc"
          [listItemTemplate]="listItemTemplate"
          [detailsTemplate]="detailsTemplate"
          (itemSelected)="onSelect($event)"
          >
        </app-list-details>
      `,
      props: {
        items: object('items', MOCK_DATA),
        onSelect: actions.onSelect
      }
    }
  })
