import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CounterComponent } from './components/counter/counter.component';
import { FixedSlideablePanelComponent } from './components/fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { IconComponent } from './components/icon/icon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NestedCheckboxesComponent } from './components/nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesGroupComponent } from './components/nested-checkboxes-group/nested-checkboxes-group.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TabComponent } from './components/tabset/tab/tab.component';

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
    LoaderComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesGroupComponent,
    PlaceholderComponent,
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
