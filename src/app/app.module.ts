import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz/quiz-card/quiz-card.component';
import { QuizMenuComponent } from './quiz/quiz-menu/quiz-menu.component';
import { SelectComponent } from './select/select.component';
import { SelectCountryComponent } from './select/select-country/select-country.component';
import { SelectQuantityComponent } from './select/select-quantity/select-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    QuizComponent,
    QuizCardComponent,
    QuizMenuComponent,
    SelectComponent,
    SelectCountryComponent,
    SelectQuantityComponent
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
