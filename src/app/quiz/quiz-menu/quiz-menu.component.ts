import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
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
  private promptDict: _.Dictionary<string> = {
    [QuizTypes.flagsCountries]: 'name',
    [QuizTypes.capitalsCountries]: 'name',
    [QuizTypes.countriesCapitals]: 'capital'
  };

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.menuPosition$ = this.quiz$.pipe(
      map(quiz => quiz.isComplete ? 'fullscreen' : 'header' as FixedSlideablePanelPosition),
      distinctUntilChanged(),
    );
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        const key = this.promptDict[quiz.type];
        return _.get(quiz, `currentCountry.${key}`);
      }),
      distinctUntilChanged()
    );
  }
}
