import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    LayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
