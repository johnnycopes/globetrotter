import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz/quiz-cards/quiz-card/quiz-card.component';
import { QuizCardsComponent } from './quiz/quiz-cards/quiz-cards.component';
import { QuizMenuComponent } from './quiz/quiz-menu/quiz-menu.component';
import { SelectComponent } from './select/select.component';
import { SelectCountriesComponent } from './select/select-countries/select-countries.component';
import { SelectQuantityComponent } from './select/select-quantity/select-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent,
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
