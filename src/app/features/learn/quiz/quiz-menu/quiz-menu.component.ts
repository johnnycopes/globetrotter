import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { Animation } from 'src/app/shared/model/animation.enum';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss']
})
export class QuizMenuComponent implements OnInit, OnDestroy {
  quiz$ = this.quizService.getQuiz();
  prompt$: Observable<string>;
  menuPosition: FixedSlideablePanelPosition;
  menuPositionSubscription: Subscription;
  private promptDict: _.Dictionary<string> = {
    [QuizType.flagsCountries]: 'name',
    [QuizType.capitalsCountries]: 'name',
    [QuizType.countriesCapitals]: 'capital'
  };

  constructor(
    private quizService: QuizService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prompt$ = this.quiz$.pipe(
      map(quiz => {
        const currentCountry = _.head(quiz.countries);
        const key = this.promptDict[quiz.type];
        return _.get(currentCountry, key, '');
      }),
      distinctUntilChanged()
    );
    this.menuPositionSubscription = this.quiz$.pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    ).subscribe(
      async isComplete => {
        if (isComplete) {
          this.menuPosition = 'offscreen';
          await this.utilityService.wait(Animation.cardsFadeInDelay);
          this.menuPosition = 'fullscreen';
        } else {
          this.menuPosition = 'header';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.menuPositionSubscription.unsubscribe();
  }

  onBack(): void {
    this.quizService.reset();
    this.router.navigate(['learn']);
  }
}
