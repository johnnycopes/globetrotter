import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationLinkComponent } from './navigation/navigation-link/navigation-link.component';

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
})
export class CoreModule { }
