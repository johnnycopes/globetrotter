import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { QuizService } from '../core/quiz/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { SelectService } from '../core/select/select.service';

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
        this.quizService.initializeQuiz(selection);
      }
    );
  }
}
