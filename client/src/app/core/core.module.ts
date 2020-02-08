import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './components/shell/shell.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ErrorComponent } from './components/error/error.component';
// import { AuthInterceptorProvider } from './interceptors/auth/auth.interceptor'; // TODO: uncomment once needed

@NgModule({
  declarations: [
    ShellComponent,
    NavigationComponent,
    HomeComponent,
    PageNotFoundComponent,
    PlaceholderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    BrowserAnimationsModule,
    ErrorComponent
  ],
  providers: [
    // AuthInterceptorProvider, // TODO: uncomment once needed
  ]
})
export class CoreModule { }
