import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';
import { LearnComponent } from './features/learn/learn.component';
import { SelectComponent } from './features/learn/select/select.component';
import { QuizComponent } from './features/learn/quiz/quiz.component';

const routes: Routes = [
  { path: 'explore', component: PlaceholderComponent },
  { path: 'prepare', component: PlaceholderComponent },
  { path: 'learn', component: LearnComponent, children: [
    { path: 'quiz', component: QuizComponent },
    { path: 'select', component: SelectComponent },
    { path: '', redirectTo: 'select', pathMatch: 'full' }
  ]},
  { path: 'account', component: PlaceholderComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
