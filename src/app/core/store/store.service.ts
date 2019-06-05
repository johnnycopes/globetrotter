import { Injectable } from '@angular/core';

import { Store } from '../utility/store.class';
import { Quiz } from 'src/app/model/quiz.class';
import { Pages } from 'src/app/model/pages.enum';
import { QuizTypes } from 'src/app/model/quiz-types.enum';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends Store {

  constructor() {
    const state = {
      quiz: new Quiz(),
      page: Pages.home,
      selection: {
        type: QuizTypes.flagsCountries,
        quantity: 0,
        countries: {},
      }
    };
    super(state);
  }
}
