import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz/quiz.service';
import { SelectService } from 'src/app/core/services/select/select.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      queryParams => {
        const params = {
          type: queryParams.get('type'),
          quantity: queryParams.get('quantity'),
          countries: queryParams.get('countries')
        };
        const selection = this.selectService.mapQueryParamsToSelection(params);
        this.selectService.updateSelection(selection);
        this.quizService.initializeQuiz(selection);
      }
    );
  }
}
