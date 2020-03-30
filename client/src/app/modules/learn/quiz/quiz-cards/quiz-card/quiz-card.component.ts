import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { ICountry } from '@models/country.interface';
import { EAnimationDuration } from '@models/animation-duration.enum';
import { EQuizType } from '@models/quiz-type.enum';
import { FlipCardComponent, TFlipCardGuess } from '@shared/components/flip-card/flip-card.component';
import { QuizService } from '@services/quiz/quiz.service';
import { UtilityService } from '@services/utility/utility.service';

interface IViewModel {
  guess: TFlipCardGuess;
  disabled: boolean;
}

type TCardTemplates = _.Dictionary<TemplateRef<any>>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizCardComponent implements OnInit, AfterViewInit {
  @Input() country: ICountry;
  @Input() isCurrentCountry: boolean;
  @Input() canFlip: boolean;
  @Input() type: EQuizType;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild('flagTemplate') flagTemplate: TemplateRef<any>;
  @ViewChild('countryTemplate') countryTemplate: TemplateRef<any>;
  @ViewChild('capitalTemplate') capitalTemplate: TemplateRef<any>;
  @ViewChild(FlipCardComponent) private flipCardComponent: FlipCardComponent;
  vm$: Observable<IViewModel>;
  template: TCardTemplates;
  private templatesDict: _.Dictionary<TCardTemplates>;
  private processingFlip = false;
  private guess$: Observable<TFlipCardGuess>;
  private guessChange = new BehaviorSubject<TFlipCardGuess>("none");
  private disabled$: Observable<boolean>;
  private disabledChange = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.guess$,
      this.disabled$
    ]).pipe(
      map(([guess, disabled]) => ({ guess, disabled }))
    );
  }

  ngAfterViewInit() {
    this.setCardTemplates();
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
        this.guessChange.next(this.isCurrentCountry ? 'correct' : 'incorrect');
      }
      else if (toState === 'front' && this.processingFlip) {
        this.isCurrentCountry ? this.disabledChange.next(true) : this.updateQuiz();
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await this.utilityService.wait(EAnimationDuration.displayCard);
        this.guessChange.next('none');
        this.flipCardComponent.flip();
      }
    }

    // disabled is only reached after guess state to correct
    else if (triggerName === 'disabled' && toState === 'disabled') {
      this.updateQuiz();
    }
  }

  onFlip(): void {
    this.processingFlip = true;
    this.flipped.emit(true);
  }

  private updateQuiz() {
    this.quizService.updateQuiz(this.isCurrentCountry);
    this.flipped.emit(false);
    this.processingFlip = false;
  }

  private initializeStreams(): void {
    this.guess$ = this.guessChange.asObservable().pipe(
      distinctUntilChanged()
    );
    this.disabled$ = this.disabledChange.asObservable().pipe(
      distinctUntilChanged()
    );
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
    this.template = this.templatesDict[this.type];
  }
}
