import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  object
} from '@storybook/addon-knobs';

import { MOCK_DATA } from './mock-data/list-details.data';
import { ICountry } from '@models/country.interface';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ListDetailsComponent } from '@shared/components/list-details/list-details.component';

const actions = {
  onSelect: action('selected')
};

storiesOf('Shared/List Details', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        AlertComponent,
        InputComponent,
        ListDetailsComponent
      ]
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
          let-country
          >
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
          [listItemTemplate]="listItemTemplate"
          [detailsTemplate]="detailsTemplate"
          [getItemUniqueId]="getUniqueId"
          [selectedItem]="selectedItem"
          (selectedItemChange)="onSelect($event)"
          >
        </app-list-details>
      `,
      props: {
        selectedItem: object('item', MOCK_DATA[0]),
        items: object('items', MOCK_DATA),
        getUniqueId: (item: ICountry) => item.cioc,
        onSelect: actions.onSelect
      }
    }
  })
