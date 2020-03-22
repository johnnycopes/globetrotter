import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ERoute } from './models/route.enum';
import { CountryService } from './services/country/country.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { ShellComponent } from './components/shell/shell.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent, resolve: { countries: CountryService }, children: [
    { path: ERoute.home, component: HomeComponent },
    {
      path: ERoute.explore,
      loadChildren: () => import('./modules/explore/explore.module').then(m => m.ExploreModule)
    },
    { path: ERoute.prepare, component: PlaceholderComponent },
    {
      path: ERoute.learn,
      loadChildren: () => import('./modules/learn/learn.module').then(m => m.LearnModule)
    },
    {
      path: ERoute.account,
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
    },
    { path: '', redirectTo: ERoute.home, pathMatch: 'full' }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
