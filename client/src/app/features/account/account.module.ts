import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent,
    AuthComponent
  ],
  exports: [
    AccountComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
