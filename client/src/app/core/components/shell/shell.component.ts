import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { RouterService } from '../../services/router/router.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  showNavigation$: Observable<boolean>;
  showModal$: Observable<boolean>;
  modalMessage$: Observable<string>;
  quizComplete$: Observable<boolean>;

  constructor(
    private routerService: RouterService,
    private modalService: ModalService,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.showNavigation$ = this.routerService.getCurrentRoute().pipe(
      map(currentRoute => currentRoute !== RouteNames.learn),
      distinctUntilChanged()
    );
    this.showModal$ = this.modalService.getOpen();
    this.modalMessage$ = this.modalService.getMessage();
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }

  onModalConfirm(): void {
    this.modalService.setOpen(false);
  }
}
