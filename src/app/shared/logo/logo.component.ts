import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { QuizService } from '../../core/quiz/quiz.service';
import { SelectService } from '../../core/select/select.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  constructor(
    private router: Router,
    private quizService: QuizService,
    private selectService: SelectService
  ) { }

  reset(): void {
    this.quizService.reset();
    this.selectService.reset();
    this.router.navigate(['']);
  }
}
