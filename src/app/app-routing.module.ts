import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { SelectComponent } from './features/select/select.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';

const routes: Routes = [
  { path: 'explore', component: PlaceholderComponent },
  { path: 'prepare', component: PlaceholderComponent },
  { path: 'select', component: SelectComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'account', component: PlaceholderComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
