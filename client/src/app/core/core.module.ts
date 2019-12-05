import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErrorInterceptorProvider } from './interceptors/error/error.interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationLinkComponent } from './components/navigation/navigation-link/navigation-link.component';

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
    NavigationComponent
  ],
  declarations: [
    NavigationComponent,
    NavigationLinkComponent
  ],
  providers: [
    ErrorInterceptorProvider
  ]
})
export class CoreModule { }
