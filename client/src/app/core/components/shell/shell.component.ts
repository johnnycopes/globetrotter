import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { QuizService } from '../../services/quiz/quiz.service';
import { Country } from 'src/app/shared/model/country.interface';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  appLoadComplete$: Observable<Country[]>;
  quizComplete$: Observable<boolean>;

  constructor(
    private quizService: QuizService,
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.appLoadComplete$ = this.countryService.resolve();
    this.quizComplete$ = this.quizService.getQuiz().pipe(
      map(quiz => quiz.isComplete),
      distinctUntilChanged()
    );
  }

}
