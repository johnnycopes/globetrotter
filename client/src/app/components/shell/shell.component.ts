import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';

import { RouterService } from '@services/router/router.service';
import { QuizService } from '@services/quiz/quiz.service';
import { ModalService } from '@services/modal/modal.service';
import { UtilityService } from '@services/utility/utility.service';
import { ERoute } from '@models/route.enum';
import { EAnimationDuration } from '@models/animation-duration.enum';

interface ViewModel {
  showNavigation: boolean;
  showContent: boolean;
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
  private showNavigationChange = new BehaviorSubject<boolean>(false);
  private showNavigation$: Observable<boolean>;
  private showContent$: Observable<boolean>;
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
    this.initializeStreams();
    // const streams = {
    //   showNavigation: this.showNavigation$,
    //   showContent: this.showContent$,
    //   showModal: this.showModal$,
    //   modalMessage: this.modalMessage$,
    //   quizComplete: this.quizComplete$
    // };

    // this.vm$ = this.utilityService.combineStreams<ViewModel>(streams);

    // this.vm$ = this.utilityService.combineStuffUnsafeButVariable<ViewModel>([
    //   this.showNavigation$,
    //   this.showContent$,
    //   this.showModal$,
    //   this.modalMessage$,
    //   this.quizComplete$
    // ],
    //   ([showNavigation, showContent, showModal, modalMessage, quizComplete]) => ({
    //     showNavigation,
    //     showContent,
    //     showModal,
    //     modalMessage,
    //     quizComplete
    //   })
    // );

    // this.vm$ = this.utilityService.combineFiveStreams(
    //   this.showNavigation$,
    //   this.showContent$,
    //   this.showModal$,
    //   this.modalMessage$,
    //   this.quizComplete$,
    //   ([showNavigation, showContent, showModal, modalMessage, quizComplete]) => ({
    //     showNavigation,
    //     showContent,
    //     showModal,
    //     modalMessage,
    //     quizComplete
    //   })
    // );

    this.vm$ = combineLatest([
      this.showNavigation$,
      this.showContent$,
      this.showModal$,
      this.modalMessage$,
      this.quizComplete$
    ]).pipe(
      map(([
        showNavigation,
        showContent,
        showModal,
        modalMessage,
        quizComplete
      ]) => ({
        showNavigation,
        showContent,
        showModal,
        modalMessage,
        quizComplete
      })
    ));
  }

  onModalConfirm(): void {
    this.modalService.setOpen(false);
  }

  private initializeStreams(): void {
    this.showNavigation$ = this.routerService.getCurrentRoute().pipe(
      map(currentRoute => currentRoute !== ERoute.learn),
      distinctUntilChanged(),
      tap(async (showNavigation) => {
        this.showNavigationChange.next(false);
        if (showNavigation) {
          await this.utilityService.wait(EAnimationDuration.fixedSlideablePanel);
        }
        this.showNavigationChange.next(true);
      })
    );
    this.showContent$ = this.showNavigationChange.asObservable().pipe(
      distinctUntilChanged()
    );
    this.showModal$ = this.modalService.getOpen();
    this.modalMessage$ = this.modalService.getMessage();
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }
}
