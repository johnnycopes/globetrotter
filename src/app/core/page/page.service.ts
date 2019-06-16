import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Pages } from 'src/app/model/pages.enum';
import { Store } from '../utility/store.class';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private readonly store: Store;

  constructor() {
    this.store = new Store({
      page: Pages.home
    });
  }

  reset(): void {
    this.store.set(['page'], Pages.home);
  }

  getPage(): Observable<Pages> {
    return this.store.get(['page']);
  }

  nextPage(): void {
    this.store.transform(['page'], (page) => {
      if (page === Pages.home) {
        return Pages.type;
      }
      else if (page === Pages.type) {
        return Pages.quantity;
      }
      else if (page === Pages.quantity) {
        return Pages.countries;
      }
      else if (page === Pages.countries) {
        return Pages.quiz;
      }
    });

  }
}
