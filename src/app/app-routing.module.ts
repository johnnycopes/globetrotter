import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SelectComponent } from './select/select.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: 'select', component: SelectComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
