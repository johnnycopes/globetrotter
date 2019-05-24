import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Country } from 'src/app/model/country.interface';
import { QuizService } from '../../quiz.service';
import { FlipCardComponent } from 'src/app/shared/flip-card/flip-card.component';
import { Animations } from 'src/app/model/animations.enum';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() country: Country;
  @Input() canFlip: boolean;
  @Output() flipped = new EventEmitter<boolean>();
  @ViewChild(FlipCardComponent)
  private flipCardComponent: FlipCardComponent;
  guess: 'correct' | 'incorrect' | '';
  disabled: boolean;

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
    const guessString = correctGuess ? 'correct' : 'incorrect';
    this.guess = guessString;
  }

  private resetCardGuess(): void {
    this.flipCardComponent.flip();
    this.guess = '';
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
