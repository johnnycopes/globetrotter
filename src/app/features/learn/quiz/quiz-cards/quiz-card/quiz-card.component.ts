import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Country } from 'src/app/shared/model/country.interface';
import { FlipCardComponent, FlipCardGuess } from 'src/app/shared/components/flip-card/flip-card.component';
import { Animation } from 'src/app/shared/model/animation.enum';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

type CardTemplates = _.Dictionary<TemplateRef<any>>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit, OnDestroy {
  @Input() country: Country;
  @Input() canFlip: boolean;
  @Input() type: QuizType;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild('flagTemplate', { static: true }) flagTemplate: TemplateRef<any>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate: TemplateRef<any>;
  @ViewChild('capitalTemplate', { static: true }) capitalTemplate: TemplateRef<any>;
  @ViewChild(FlipCardComponent, { static: true }) private flipCardComponent: FlipCardComponent;
  guess: FlipCardGuess;
  disabled: boolean;
  templates: CardTemplates;
  templatesDict: _.Dictionary<CardTemplates>;
  private currentCountry: Country;
  private currentCountrySubscription: Subscription;

  ngOnInit(): void {
    this.setCardTemplates();
    this.currentCountrySubscription = this.quizService.getQuiz().subscribe(
      quiz => this.currentCountry = _.head(quiz.countries)
    );
  }

  ngOnDestroy(): void {
    this.currentCountrySubscription.unsubscribe();
  }

  constructor(
    private quizService: QuizService,
    private utilityService: UtilityService
  ) { }

  async onFlip(): Promise<void> {
    const isGuessCorrect = this.country === this.currentCountry;
    this.flipped.emit(true);
    await this.utilityService.wait(Animation.flipCard);
    this.setCardGuess(isGuessCorrect)
    await this.utilityService.wait(Animation.displayCard);
    this.resetCardGuess();
    await this.utilityService.wait(Animation.flipCard);
    if (isGuessCorrect) {
      this.disabled = true;
      await this.utilityService.wait(Animation.flipCard);
      this.updateQuiz(isGuessCorrect);
    }
    else {
      this.updateQuiz(isGuessCorrect);
    }
  }

  private setCardGuess(correctGuess: boolean): void {
    this.guess = correctGuess ? 'correct' : 'incorrect';
  }

  private resetCardGuess(): void {
    this.flipCardComponent.flip();
    this.guess = 'none';
  }

  private setCardTemplates(): void {
    this.templatesDict = {
      [QuizType.flagsCountries]: {
        front: this.flagTemplate,
        back: this.countryTemplate
      },
      [QuizType.capitalsCountries]: {
        front: this.capitalTemplate,
        back: this.countryTemplate
      },
      [QuizType.countriesCapitals]: {
        front: this.countryTemplate,
        back: this.capitalTemplate
      }
    };
    this.templates = this.templatesDict[this.type];
  }

  private updateQuiz(correctGuess: boolean) {
    this.quizService.updateQuiz(correctGuess);
    this.flipped.emit(false);
  }
}
