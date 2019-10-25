import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectModule } from './select/select.module';
import { QuizModule } from './quiz/quiz.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

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
    AppRoutingModule,
    QuizModule,
    SelectModule
  ]
})
export class LearnModule { }
