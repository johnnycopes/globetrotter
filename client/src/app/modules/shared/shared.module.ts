import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ContainerComponent } from './components/container/container.component';
import { FixedSlideablePanelComponent } from './components/fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { FormComponent } from './components/form/form.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MeasurementPipe } from './pipes/measurement.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { NestedCheckboxesComponent } from './components/nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesWithCountsComponent } from './components/nested-checkboxes-with-counts/nested-checkboxes-with-counts.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { SmallCapsComponent } from './components/small-caps/small-caps.component';
import { TabComponent } from './components/tabset/tab/tab.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TreeComponent } from './components/tree/tree.component';
import { SmallCapsContentComponent } from './components/small-caps-content/small-caps-content.component';

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
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    FormComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    ListDetailsComponent,
    MeasurementPipe,
    ModalComponent,
    NestedCheckboxesComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
    SmallCapsContentComponent,
    TabComponent,
    TabsetComponent,
    TreeComponent,
    NestedCheckboxesWithCountsComponent,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    CheckboxComponent,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    FormComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    MeasurementPipe,
    ModalComponent,
    ListDetailsComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesWithCountsComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
    SmallCapsContentComponent,
    TabComponent,
    TabsetComponent,
    TreeComponent
  ]
})
export class SharedModule { }
