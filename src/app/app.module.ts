import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './modules/account/account.module';
import { ExploreModule } from './modules/explore/explore.module';
import { LearnModule } from './modules/learn/learn.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    NavigationComponent,
    PageNotFoundComponent,
    PlaceholderComponent,
    ShellComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AccountModule,
    ExploreModule,
    LearnModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
