import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';

import { RouterService } from '../../services/router/router.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { ModalService } from '../../services/modal/modal.service';
import { UtilityService } from '../../services/utility/utility.service';
import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { AnimationTimes } from 'src/app/shared/model/animation-times.enum';
import { Quiz } from 'src/app/shared/model/quiz.class';

interface ViewModel {
  showNavigation: boolean;
  showModal: boolean;
  modalMessage: string;
  quizComplete: boolean;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  vm$: Observable<ViewModel>;
  showContent: boolean;
  private showNavigation$: Observable<boolean>;
  private showModal$: Observable<boolean>;
  private modalMessage$: Observable<string>;
  private quizComplete$: Observable<boolean>;

  constructor(
    private routerService: RouterService,
    private modalService: ModalService,
    private quizService: QuizService,
    private utilityService: UtilityService
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
    this.vm$ = combineLatest([
      this.showNavigation$,
      this.showModal$,
      this.modalMessage$,
      this.quizComplete$
    ]).pipe(
      map(([showNavigation, showModal, modalMessage, quizComplete]) => ({ showNavigation, showModal, modalMessage, quizComplete })),
      tap(async ({ showNavigation }) => {
        this.showContent = false;
        if (showNavigation) {
          await this.utilityService.wait(AnimationTimes.fixedSlideablePanel);
        }
        this.showContent = true;
      })
    );
  }

  onModalConfirm(): void {
    this.modalService.setOpen(false);
  }
}
