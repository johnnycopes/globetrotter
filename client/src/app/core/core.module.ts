import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './components/shell/shell.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthInterceptorProvider } from './interceptors/auth/auth.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    LayoutModule,
    SharedModule,
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ShellComponent,
    NavigationComponent,
    PageNotFoundComponent,
    ErrorComponent
  ],
  declarations: [
    ShellComponent,
    NavigationComponent,
    PageNotFoundComponent,
    ErrorComponent
  ],
  providers: [
    // AuthInterceptorProvider, // TODO: uncomment once needed
  ]
})
export class CoreModule { }
