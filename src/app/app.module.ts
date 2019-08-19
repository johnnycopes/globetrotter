import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { QuizModule } from './features/quiz/quiz.module';
import { SelectModule } from './features/select/select.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    QuizModule,
    SelectModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
