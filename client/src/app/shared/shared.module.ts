import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CounterComponent } from './components/counter/counter.component';
import { FixedSlideablePanelComponent } from './components/fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NestedCheckboxesComponent } from './components/nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesGroupComponent } from './components/nested-checkboxes-group/nested-checkboxes-group.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TabComponent } from './components/tabset/tab/tab.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    FormComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    PlaceholderComponent,
    RadioButtonsComponent,
    TabsetComponent,
    TabComponent,
    AlertComponent,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    CheckboxComponent,
    CounterComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    FormComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    PlaceholderComponent,
    RadioButtonsComponent,
    TabsetComponent,
    TabComponent,
  ]
})
export class SharedModule { }
