/* eslint-disable brace-style */
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ICountry } from '@models/country.interface';
import { EDuration } from '@models/duration.enum';
import { EQuizType } from '@models/quiz-type.enum';
import { FlipCardComponent, TFlipCardGuess } from '@shared/components/flip-card/flip-card.component';
import { QuizService } from '@services/quiz/quiz.service';
import { wait } from '@utility/functions/wait';

interface IViewModel {
  guess: TFlipCardGuess;
  disabled: boolean;
}

type CardTemplate = Record<'front' | 'back', TemplateRef<unknown>>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizCardComponent implements OnInit {
  @Input() country: ICountry;
  @Input() isCurrentCountry: boolean;
  @Input() canFlip: boolean;
  @Input() type: EQuizType;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild('flagTemplate', { static: true }) flagTemplate: TemplateRef<unknown>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate: TemplateRef<unknown>;
  @ViewChild('capitalTemplate', { static: true }) capitalTemplate: TemplateRef<unknown>;
  @ViewChild(FlipCardComponent) private flipCardComponent: FlipCardComponent;
  vm$: Observable<IViewModel>;
  template: CardTemplate;
  private templates: Record<EQuizType, CardTemplate>;
  private processingFlip = false;
  private guess$: Observable<TFlipCardGuess>;
  private guessChange = new BehaviorSubject<TFlipCardGuess>("none");
  private disabled$: Observable<boolean>;
  private disabledChange = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.setCardTemplates();
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.guess$,
      this.disabled$
    ]).pipe(
      map(([guess, disabled]) => ({ guess, disabled }))
    );
  }

  constructor(private quizService: QuizService) { }

  async onAnimationFinish(event: AnimationEvent): Promise<void> {
    const { triggerName, toState } = event;

    // onFlip kicks off the chain of events, starting with the flip animation from front to back
    if (triggerName === 'flip') {
      if (toState === 'back') {
        this.guessChange.next(this.isCurrentCountry ? 'correct' : 'incorrect');
      } else if (toState === 'front' && this.processingFlip) {
        if (this.isCurrentCountry) {
          this.disabledChange.next(true);
        } else {
          await this.updateQuiz();
        }
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await wait(EDuration.cardFlipDisplay);
        this.guessChange.next('none');
        this.flipCardComponent.flip();
      }
    }

    // disabled is only reached after guess state to correct
    else if (triggerName === 'disabled' && toState === 'disabled') {
      await this.updateQuiz();
    }
  }

  onFlip(): void {
    this.processingFlip = true;
    this.flipped.emit(true);
  }

  private async updateQuiz() {
    await wait(EDuration.shortDelay);
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
    this.templates = {
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
    this.template = this.templates[this.type];
  }
}
