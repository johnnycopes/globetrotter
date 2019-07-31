import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CounterComponent } from './counter/counter.component';
import { FixedSlideablePanelComponent } from './fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesGroupComponent } from './nested-checkboxes-group/nested-checkboxes-group.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tabset/tab/tab.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    LogoComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    TabsetComponent,
    TabComponent,
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    LogoComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    RadioButtonsComponent,
    TabsetComponent,
    TabComponent,
  ]
})
export class SharedModule { }
