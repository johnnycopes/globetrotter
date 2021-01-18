import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QuizService } from '@services/quiz.service';
import { SelectService } from '@services/select.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
  showCards: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private selectService: SelectService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      queryParams => {
        const params = {
          type: queryParams.get('type') || '',
          quantity: queryParams.get('quantity') || '',
          countries: queryParams.get('countries') || ''
        };
        const selection = this.selectService.mapQueryParamsToSelection(params);
        this.selectService.updateSelection(selection);
        this.quizService.initializeQuiz(selection);
      }
    );
  }
}
