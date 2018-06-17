import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { CountrySelectionComponent } from './country-selection/country-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizCardComponent,
    CountrySelectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
