import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RouteNames } from '@models/route-names.enum';
import { SharedModule } from '@shared/shared.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const accountRoutes: Routes = [
  { path: '', component: AccountComponent, children: [
    { path: RouteNames.auth, component: AuthComponent },
    { path: RouteNames.profile, component: ProfileComponent },
    { path: '', redirectTo: RouteNames.profile, pathMatch: 'full' }
  ]}
];

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(accountRoutes),
  ]
})
export class AccountModule { }
