import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SelectComponent } from './select.component';
import { SelectCountriesComponent } from './select-countries/select-countries.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent
  ]
})
export class SelectModule { }
