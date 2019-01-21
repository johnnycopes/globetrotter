import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Country } from 'src/app/model/country.interface';
import { QuizService } from '../../quiz.service';
import { FlipCardComponent } from 'src/app/shared/flip-card/flip-card.component';

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
  guess: string;
  disabled: boolean;

  constructor(private quizService: QuizService) { }

  onFlip() {
    // prevent all cards from being flipped
    this.flipped.emit(true);

    // evaluate guess and pass it to the card after it finishes its flip animation
    const correctGuess = this.quizService.evaluateGuess(this.country);
    const correctGuessString = correctGuess ? 'correct' : 'incorrect';
    setTimeout(() => this.guess = correctGuessString, 300);

    // flip the card back over and clear guess animation
    setTimeout(() => {
      this.flipCardComponent.flip();
      this.guess = '';
    }, 1500);

    // disable card if correct guess, update quiz, and allow all cards to be flipped
    setTimeout(() => {
      if (correctGuess) {
        this.disabled = true;
         // delay updates to allow disabled animation time to finish
        setTimeout(() => this.updateQuiz(correctGuess), 300);
      }
      else {
        this.updateQuiz(correctGuess);
      }
    }, 1800);
  }

  private updateQuiz(correctGuess: boolean) {
    this.quizService.updateQuiz(correctGuess);
    this.flipped.emit(false);
  }
}
