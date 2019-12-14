import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { QuizService } from '../../services/quiz/quiz.service';
import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { RouterService } from '../../services/router/router.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  showNavigation$: Observable<boolean>;
  quizComplete$: Observable<boolean>;

  constructor(
    private routerService: RouterService,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.showNavigation$ = this.routerService.getCurrentRoute().pipe(
      map(currentRoute => currentRoute !== RouteNames.learn)
    );
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }

}
