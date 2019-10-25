import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { LearnModule } from './features/learn/learn.module';
import { AccountModule } from './features/account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    LearnModule,
    AccountModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
