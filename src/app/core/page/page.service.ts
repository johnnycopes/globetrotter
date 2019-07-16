import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from 'src/app/model/store.class';
import { Pages } from 'src/app/model/pages.enum';

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
    this.store.transform(['page'], () => Pages.quiz);
  }
}
