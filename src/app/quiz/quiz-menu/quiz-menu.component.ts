import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/quiz/quiz.service';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  quiz$ = this.quizService.quiz$;
  menuPosition$: Observable<FixedSlideablePanelPosition>;
  prompt$: Observable<string>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.menuPosition$ = this.quiz$.pipe(
      // distinctUntilKeyChanged('isComplete'), // TODO: find out why this doesn't work
      map(quiz => quiz.isComplete ? 'fullscreen' : 'header'),
    );
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        if (quiz.type === QuizTypes.countriesCapitals) {
          return _.get(quiz, 'currentCountry.capital');
        }
        else {
          return _.get(quiz, 'currentCountry.name');
        }
      })
    );
  }
}
