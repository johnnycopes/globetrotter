import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';

import { Country } from 'src/app/model/country.interface';
import { Selection } from '../select/select.service';
import { QuizService, Quiz } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('stagger', [
      transition(':enter', [
        query(':enter', stagger('100ms', [animateChild()]))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('400ms 600ms ease-in-out', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class QuizComponent implements OnInit {
  @Input() selection: Selection;
  countries: Country[];
  quiz: Quiz;
  canFlipCards = true;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.initializeCountries();
    this.initializeQuiz();
  }

  onFlip(cardFlipped: boolean) {
    this.canFlipCards = !cardFlipped;
  }

  private initializeCountries() {
    this.countries = this.quizService.selectCountries(this.selection);
  }

  private initializeQuiz() {
    this.quizService.createQuiz(this.countries);
    this.quiz = this.quizService.quiz;
  }

}
