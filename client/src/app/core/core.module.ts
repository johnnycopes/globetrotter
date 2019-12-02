import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';
import { ErrorInterceptorProvider } from './interceptors/error/error.interceptor';
import { HeaderComponent } from './components/header/header.component';
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
    HeaderComponent,
    NavigationComponent
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    NavigationLinkComponent
  ],
  providers: [
    ErrorInterceptorProvider
  ]
})
export class CoreModule { }
