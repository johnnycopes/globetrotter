import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SelectComponent } from './select.component';
import { SelectCountriesComponent } from './select-countries/select-countries.component';
import { SelectHomeComponent } from './select-home/select-home.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectCountriesComponent,
    SelectHomeComponent,
    SelectQuantityComponent,
    SelectTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    SelectComponent,
    SelectCountriesComponent,
    SelectHomeComponent,
    SelectQuantityComponent,
    SelectTypeComponent
  ],
  entryComponents: [
    SelectCountriesComponent,
    SelectHomeComponent,
    SelectQuantityComponent,
    SelectTypeComponent
  ]
})
export class SelectModule { }
