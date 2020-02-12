import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ExploreComponent } from './explore.component';

const exploreRoutes: Routes = [
  { path: '', component: ExploreComponent }
];

@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(exploreRoutes)
  ]
})
export class ExploreModule { }
