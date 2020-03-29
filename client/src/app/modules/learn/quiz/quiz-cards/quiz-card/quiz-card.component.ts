import { Component, Input, Output, EventEmitter, ViewChild, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
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
  styleUrls: ['./quiz-card.component.scss'],
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
  guess: TFlipCardGuess = "none";
  disabled: boolean = false;
  templates: TCardTemplates;
  private isGuessCorrect: boolean | undefined;
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

  async onAnimationFinish(event: AnimationEvent) {
    const { triggerName, toState } = event;

    // onFlip kicks off the chain of events, starting with the flip animation from front to back
    if (triggerName === 'flip') {
      if (toState === 'back') {
        this.guess = this.isGuessCorrect ? 'correct' : 'incorrect';
      }
      else if (toState === 'front') {
        if (this.isGuessCorrect === false) {
          this.updateQuiz(false);
        }
        else if (this.isGuessCorrect === true) {
          this.disabled = true;
        }
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await this.utilityService.wait(EAnimationDuration.displayCard);
        this.guess = 'none';
        this.flipCardComponent.flip();
      }
    }

    // disabled is only reached after guess state to correct
    else if (triggerName === 'disabled' && toState === 'disabled') {
      this.updateQuiz(true);
    }
  }

  async onFlip(): Promise<void> {
    this.isGuessCorrect = this.country === this.currentCountry;
    this.flipped.emit(true);
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
