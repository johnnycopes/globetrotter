import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { Country } from 'src/app/model/country.interface';
import { FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { QuizService } from 'src/app/core/quiz/quiz.service';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit, OnDestroy {
  currentCountry: Country;
  currentIndex: number;
  totalCountries: number;
  guess: number;
  accuracy: number;
  quizCompleted: boolean;
  promptTemplate: TemplateRef<any>;
  @ViewChild('countryTemplate') countryTemplate: TemplateRef<any>;
  @ViewChild('capitalTemplate') capitalTemplate: TemplateRef<any>;
  private quizSubscription: Subscription;
  private quizCompletedSubscription: Subscription;

  constructor(private quizService: QuizService) { }

  get position(): FixedSlideablePanelPosition {
    return this.quizCompleted ? 'fullscreen' : 'header';
  }

  ngOnInit(): void {
    this.quizSubscription = this.quizService.quizUpdated
      .subscribe(
        quiz => {
          this.currentCountry = quiz.currentCountry;
          this.totalCountries = quiz.countries.length;
          this.currentIndex = quiz.currentIndex;
          this.guess = quiz.guess;
          this.accuracy = quiz.accuracy;
          this.setPromptTemplate(quiz.type);
        }
      );
    this.quizCompletedSubscription = this.quizService.quizCompleted.subscribe(
      (quizCompleted) => this.quizCompleted = quizCompleted
    );
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
    this.quizCompletedSubscription.unsubscribe();
  }

  private setPromptTemplate(quizType: QuizTypes): void {
    if (quizType === QuizTypes.countriesCapitals) {
      this.promptTemplate = this.capitalTemplate;
    }
    else {
      this.promptTemplate = this.countryTemplate;
    }
  }
}
