import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import * as _ from 'lodash';

import { Country } from 'src/app/model/country.interface';
import { FlipCardComponent, FlipCardGuess } from 'src/app/shared/flip-card/flip-card.component';
import { Animations } from 'src/app/model/animations.enum';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { QuizService } from 'src/app/core/quiz/quiz.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { Subscription } from 'rxjs';

type CardTemplates = _.Dictionary<TemplateRef<any>>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit, OnDestroy {
  @Input() country: Country;
  @Input() canFlip: boolean;
  @Input() type: QuizTypes;
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
    await this.utilityService.wait(Animations.flipCard);
    this.setCardGuess(isGuessCorrect)
    await this.utilityService.wait(Animations.displayCard);
    this.resetCardGuess();
    await this.utilityService.wait(Animations.flipCard);
    if (isGuessCorrect) {
      this.disabled = true;
      await this.utilityService.wait(Animations.flipCard);
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
      [QuizTypes.flagsCountries]: {
        front: this.flagTemplate,
        back: this.countryTemplate
      },
      [QuizTypes.capitalsCountries]: {
        front: this.capitalTemplate,
        back: this.countryTemplate
      },
      [QuizTypes.countriesCapitals]: {
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
