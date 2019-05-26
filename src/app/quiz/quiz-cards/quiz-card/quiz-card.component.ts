import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { Country } from 'src/app/model/country.interface';
import { QuizService } from '../../quiz.service';
import { FlipCardComponent, FlipCardGuess } from 'src/app/shared/flip-card/flip-card.component';
import { Animations } from 'src/app/model/animations.enum';
import { QuizTypes } from 'src/app/model/quiz-types.enum';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country;
  @Input() canFlip: boolean;
  @Input() type: QuizTypes;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild(FlipCardComponent)
  private flipCardComponent: FlipCardComponent;
  public guess: FlipCardGuess;
  public disabled: boolean;
  public showFlagOnFront: boolean;
  public showCountryOnFront: boolean;
  public showCapitalOnFront: boolean;

  ngOnInit(): void {
    this.showFlagOnFront = this.type === QuizTypes.flagsCountries;
    this.showCountryOnFront = this.type === QuizTypes.countriesCapitals;
    this.showCapitalOnFront = this.type === QuizTypes.capitalsCountries;
  }

  constructor(private quizService: QuizService) { }

  async onFlip() {
    const isGuessCorrect = this.quizService.evaluateGuess(this.country);
    this.flipped.emit(true);
    await this.wait(Animations.flipCard);
    this.setCardGuess(isGuessCorrect)
    await this.wait(Animations.displayCard);
    this.resetCardGuess();
    await this.wait(Animations.flipCard);
    if (isGuessCorrect) {
      this.disabled = true;
      await this.wait(Animations.flipCard);
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

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }

  private updateQuiz(correctGuess: boolean) {
    this.quizService.updateQuiz(correctGuess);
    this.flipped.emit(false);
  }
}
