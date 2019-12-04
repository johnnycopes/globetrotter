import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';
import { LearnComponent } from './features/learn/learn.component';
import { SelectComponent } from './features/learn/select/select.component';
import { QuizComponent } from './features/learn/quiz/quiz.component';
import { AccountComponent } from './features/account/account.component';
import { CountryService } from './core/services/country/country.service';
import { RouteNames } from './shared/model/route-names.enum';

const routes: Routes = [
  { path: '', resolve: { countries: CountryService }, children: [
    { path: RouteNames.explore, component: PlaceholderComponent },
    { path: RouteNames.prepare, component: PlaceholderComponent },
    { path: RouteNames.learn, component: LearnComponent, children: [
      { path: RouteNames.quiz, component: QuizComponent },
      { path: RouteNames.select, component: SelectComponent },
      { path: '', redirectTo: 'select', pathMatch: 'full' }
    ]},
    { path: RouteNames.account, component: AccountComponent },
    { path: RouteNames.home, component: HomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
