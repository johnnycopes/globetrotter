import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';

import { QuizService } from '@services/quiz/quiz.service';

interface IViewModel {
  showContent: boolean;
  quizComplete: boolean;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private showContentSubject = new BehaviorSubject<boolean>(false);
  private showContent$: Observable<boolean>;
  private quizComplete$: Observable<boolean>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.showContent$,
      this.quizComplete$
    ]).pipe(
      map(([
        showContent,
        quizComplete
      ]) => ({
        showContent,
        quizComplete
      })
    ));
  }

  onNavigationReady(): void {
    this.showContentSubject.next(true);
  }

  private initializeStreams(): void {
    this.showContent$ = this.showContentSubject.asObservable().pipe(
      distinctUntilChanged()
    );
    this.quizComplete$ = this.quizService.quiz.observe().pipe(
      map(quiz => quiz?.isComplete ?? false),
      distinctUntilChanged()
    );
  }
}
