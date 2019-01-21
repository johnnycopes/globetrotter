import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-cards/quiz-card/quiz-card.component';
import { QuizCardsComponent } from './quiz-cards/quiz-cards.component';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizModule { }
