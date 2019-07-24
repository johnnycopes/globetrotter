import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { PageService } from '../../core/page/page.service';
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
    private pageService: PageService,
    private quizService: QuizService,
    private selectService: SelectService
  ) { }

  reset(): void {
    this.pageService.reset();
    this.quizService.reset();
    this.selectService.reset();
    this.router.navigate(['']);
  }
}
