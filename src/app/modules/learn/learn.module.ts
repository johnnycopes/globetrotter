import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ERoute } from '@models/enums/route.enum';
import { LearnComponent } from './learn.component';
import { QuizModule } from './quiz/quiz.module';
import { QuizComponent } from './quiz/quiz.component';
import { SelectModule } from './select/select.module';
import { SelectComponent } from './select/select.component';

const learnRoutes: Routes = [
  { path: '', component: LearnComponent, children: [
    { path: ERoute.select, component: SelectComponent },
    { path: ERoute.quiz, component: QuizComponent },
    { path: '', redirectTo: ERoute.select, pathMatch: 'full' },
  ]},
];

@NgModule({
  declarations: [
    LearnComponent
  ],
  imports: [
    CommonModule,
    QuizModule,
    SelectModule,
    RouterModule.forChild(learnRoutes),
  ]
})
export class LearnModule { }
