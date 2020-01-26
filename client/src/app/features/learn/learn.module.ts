import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SelectModule } from './select/select.module';
import { QuizModule } from './quiz/quiz.module';

import { LearnComponent } from './learn.component';

@NgModule({
  declarations: [
    LearnComponent
  ],
  exports: [
    LearnComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    QuizModule,
    SelectModule
  ]
})
export class LearnModule { }
