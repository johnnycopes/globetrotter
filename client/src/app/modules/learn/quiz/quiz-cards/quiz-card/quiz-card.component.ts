import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { ICountry } from '@models/country.interface';
import { EAnimationDuration } from '@models/animation-duration.enum';
import { EQuizType } from '@models/quiz-type.enum';
import { FlipCardComponent, TFlipCardGuess } from '@shared/components/flip-card/flip-card.component';
import { QuizService } from '@services/quiz/quiz.service';
import { UtilityService } from '@services/utility/utility.service';

type TCardTemplates = _.Dictionary<TemplateRef<any>>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit, OnDestroy {
  @Input() country: ICountry;
  @Input() canFlip: boolean;
  @Input() type: EQuizType;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild('flagTemplate', { static: true }) flagTemplate: TemplateRef<any>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate: TemplateRef<any>;
  @ViewChild('capitalTemplate', { static: true }) capitalTemplate: TemplateRef<any>;
  @ViewChild(FlipCardComponent, { static: true }) private flipCardComponent: FlipCardComponent;
  guess: TFlipCardGuess;
  disabled: boolean;
  templates: TCardTemplates;
  private templatesDict: _.Dictionary<TCardTemplates>;
  private currentCountry: ICountry;
  private currentCountrySubscription: Subscription;

  ngOnInit(): void {
    this.setCardTemplates();
    this.currentCountrySubscription = this.quizService.getQuiz().subscribe(
      quiz => this.currentCountry = quiz.countries[0]
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
    await this.utilityService.wait(EAnimationDuration.flipCard);
    this.setCardGuess(isGuessCorrect)
    await this.utilityService.wait(EAnimationDuration.displayCard);
    this.resetCardGuess();
    await this.utilityService.wait(EAnimationDuration.flipCard);
    if (isGuessCorrect) {
      this.disabled = true;
      await this.utilityService.wait(EAnimationDuration.flipCard);
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
      [EQuizType.flagsCountries]: {
        front: this.flagTemplate,
        back: this.countryTemplate
      },
      [EQuizType.capitalsCountries]: {
        front: this.capitalTemplate,
        back: this.countryTemplate
      },
      [EQuizType.countriesCapitals]: {
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
