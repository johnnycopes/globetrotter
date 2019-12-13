import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './components/shell/shell.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationLinkComponent } from './components/navigation/navigation-link/navigation-link.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthInterceptorProvider } from './interceptors/auth/auth.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ShellComponent,
    NavigationComponent,
    PageNotFoundComponent
  ],
  declarations: [
    ShellComponent,
    NavigationComponent,
    NavigationLinkComponent,
    PageNotFoundComponent
  ],
  providers: [
    // AuthInterceptorProvider, // TODO: uncomment once needed
  ]
})
export class CoreModule { }
