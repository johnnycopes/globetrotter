import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FixedSlideablePanelComponent } from './fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
// import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
// import { NestedCheckboxesGroupComponent } from './nested-checkboxes-group/nested-checkboxes-group.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { NewNestedCheckboxesComponent } from './new-nested-checkboxes/new-nested-checkboxes.component';
import { NewNestedCheckboxesGroupComponent } from './new-nested-checkboxes-group/new-nested-checkboxes-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    // NestedCheckboxesComponent,
    // NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    NewNestedCheckboxesComponent,
    NewNestedCheckboxesGroupComponent,
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    // NestedCheckboxesComponent,
    // NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    NewNestedCheckboxesComponent,
    NewNestedCheckboxesGroupComponent,
  ],
})
export class SharedModule { }
