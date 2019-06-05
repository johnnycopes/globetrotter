import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    LayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
    LayoutModule
  ]
})
export class CoreModule { }
