import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz/quiz-card/quiz-card.component';
import { QuizMenuComponent } from './quiz/quiz-menu/quiz-menu.component';
import { SelectComponent } from './select/select.component';
import { RadioButtonsComponent } from './select/radio-buttons/radio-buttons.component';
import { NestedCheckboxesGroupComponent } from './select/nested-checkboxes-group/nested-checkboxes-group.component';
import { NestedCheckboxesComponent } from './select/nested-checkboxes-group/nested-checkboxes/nested-checkboxes.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CheckboxComponent,
    QuizComponent,
    QuizCardComponent,
    QuizMenuComponent,
    SelectComponent,
    RadioButtonsComponent,
    NestedCheckboxesGroupComponent,
    NestedCheckboxesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
