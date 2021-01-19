/* eslint-disable brace-style */
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { AnimationEvent } from "@angular/animations";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

import { ICountry } from "@models/interfaces/country.interface";
import { EDuration } from "@models/enums/duration.enum";
import { EQuizType } from "@models/enums/quiz-type.enum";
import { FlipCardComponent, FlipCardGuess, FlipCardSide } from "@shared/components/flip-card/flip-card.component";
import { QuizService } from "@services/quiz.service";
import { wait } from "@utility/functions/wait";

interface IViewModel {
  guess: FlipCardGuess;
  disabled: boolean;
}

type CardTemplate = Record<FlipCardSide, TemplateRef<unknown>>;

@Component({
  selector: "app-quiz-card",
  templateUrl: "./quiz-card.component.html",
  styleUrls: ["./quiz-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizCardComponent implements OnInit {
  @Input() country: ICountry;
  @Input() isCurrentCountry: boolean;
  @Input() canFlip: boolean;
  @Input() type: EQuizType;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild("flagTemplate", { static: true }) flagTemplate: TemplateRef<unknown>;
  @ViewChild("countryTemplate", { static: true }) countryTemplate: TemplateRef<unknown>;
  @ViewChild("capitalTemplate", { static: true }) capitalTemplate: TemplateRef<unknown>;
  @ViewChild(FlipCardComponent) private flipCardComponent: FlipCardComponent;
  public vm$: Observable<IViewModel>;
  public template: CardTemplate;
  private templates: Record<EQuizType, CardTemplate>;
  private processingFlip = false;
  private guess$: Observable<FlipCardGuess>;
  private guessChange = new BehaviorSubject<FlipCardGuess>("none");
  private disabled$: Observable<boolean>;
  private disabledChange = new BehaviorSubject<boolean>(false);

  public ngOnInit(): void {
    this._setCardTemplates();
    this._initializeStreams();
    this.vm$ = combineLatest([
      this.guess$,
      this.disabled$
    ]).pipe(
      map(([guess, disabled]) => ({ guess, disabled }))
    );
  }

  constructor(private _quizService: QuizService) { }

  public async onAnimationFinish(event: AnimationEvent): Promise<void> {
    const { triggerName, toState } = event;

    // onFlip kicks off the chain of events, starting with the flip animation from front to back
    if (triggerName === "flip") {
      if (toState === "back") {
        this.guessChange.next(this.isCurrentCountry ? "correct" : "incorrect");
      } else if (toState === "front" && this.processingFlip) {
        if (this.isCurrentCountry) {
          this.disabledChange.next(true);
        } else {
          await this._updateQuiz();
        }
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === "guess") {
      if (toState === "correct" || toState === "incorrect") {
        await wait(EDuration.cardFlipDisplay);
        this.guessChange.next("none");
        this.flipCardComponent.flip();
      }
    }

    // disabled is only reached after guess state to correct
    else if (triggerName === "disabled" && toState === "disabled") {
      await this._updateQuiz();
    }
  }

  public onFlip(): void {
    this.processingFlip = true;
    this.flipped.emit(true);
  }

  private async _updateQuiz() {
    await wait(EDuration.shortDelay);
    this._quizService.updateQuiz(this.isCurrentCountry);
    this.flipped.emit(false);
    this.processingFlip = false;
  }

  private _initializeStreams(): void {
    this.guess$ = this.guessChange.asObservable().pipe(
      distinctUntilChanged()
    );
    this.disabled$ = this.disabledChange.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  private _setCardTemplates(): void {
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
