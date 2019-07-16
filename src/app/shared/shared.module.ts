import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonComponent } from './button/button.component';
import { ButtonScreenComponent } from './button-screen/button-screen.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CounterComponent } from './counter/counter.component';
import { FixedSlideablePanelComponent } from './fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesGroupComponent } from './nested-checkboxes-group/nested-checkboxes-group.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    ButtonScreenComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    TabPanelComponent,
    TabComponent,
  ],
  exports: [
    ButtonComponent,
    ButtonScreenComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    TabPanelComponent,
    TabComponent,
  ],
})
export class SharedModule { }
