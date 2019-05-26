import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public countries: Country[];
  public currentCountry: Country;
  public currentIndex: number;
  public guess: number;
  public accuracy: number;
  public quizCompleted: boolean;
  public showCurrentCountryName: boolean;
  private quizSubscription: Subscription;
  private quizCompletedSubscription: Subscription;

  constructor(private quizService: QuizService) { }

  get position(): FixedSlideablePanelPosition {
    return this.quizCompleted ? 'fullscreen' : 'header';
  }

  ngOnInit(): void {
    this.showCurrentCountryName = this.quizService.getQuizType() !== QuizTypes.countriesCapitals;
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

}
