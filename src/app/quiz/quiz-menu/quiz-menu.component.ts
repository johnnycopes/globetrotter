import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { QuizService } from 'src/app/core/quiz/quiz.service';
import { QuizType } from 'src/app/model/quiz-type.enum';
import { FixedSlideablePanelPosition } from 'src/app/shared/fixed-slideable-panel/fixed-slideable-panel.component';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit {
  quiz$ = this.quizService.getQuiz();
  menuPosition$: Observable<FixedSlideablePanelPosition>;
  prompt$: Observable<string>;
  private promptDict: _.Dictionary<string> = {
    [QuizType.flagsCountries]: 'name',
    [QuizType.capitalsCountries]: 'name',
    [QuizType.countriesCapitals]: 'capital'
  };

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.menuPosition$ = this.quiz$.pipe(
      map(quiz => quiz.isComplete ? 'fullscreen' : 'header' as FixedSlideablePanelPosition),
      distinctUntilChanged()
    );
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        const currentCountry = _.head(quiz.countries);
        const key = this.promptDict[quiz.type];
        return _.get(currentCountry, key, '');
      }),
      distinctUntilChanged()
    );
  }
}
