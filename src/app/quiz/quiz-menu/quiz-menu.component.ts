import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../quiz.service';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { Country } from 'src/app/model/country.interface';
import { FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit, OnDestroy {
  countries: Country[];
  currentCountry: Country;
  currentIndex: number;
  guess: number;
  accuracy: number;
  quizType: QuizTypes;
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
    this.setPromptTemplate();
    this.quizSubscription = this.quizService.quizUpdated.subscribe(
      (quiz) => {
        const { countries, currentIndex, guess, accuracy } = quiz;
        this.currentCountry = quiz.getCurrentCountry();
        this.countries = countries;
        this.currentIndex = currentIndex;
        this.guess = guess;
        this.accuracy = accuracy;
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

  private setPromptTemplate(): void {
    this.quizType = this.quizService.getQuizType();
    if (this.quizType === QuizTypes.countriesCapitals) {
      this.promptTemplate = this.capitalTemplate;
    }
    else {
      this.promptTemplate = this.countryTemplate;
    }
  }
}
