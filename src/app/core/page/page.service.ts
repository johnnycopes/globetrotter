import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Pages } from 'src/app/model/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pagesSubject = new BehaviorSubject<Pages>(Pages.home);
  public pages$ = this.pagesSubject.asObservable();

  constructor() { }

  reset(): void {
    this.pagesSubject.next(Pages.home);
  }

  private get page(): Pages {
    return this.pagesSubject.value;
  }

  nextPage(): void {
    if (this.page === Pages.home) {
      this.pagesSubject.next(Pages.type);
    }
    else if (this.page === Pages.type) {
      this.pagesSubject.next(Pages.quantity);
    }
    else if (this.page === Pages.quantity) {
      this.pagesSubject.next(Pages.countries);
    }
    else if (this.page === Pages.countries) {
      this.pagesSubject.next(Pages.quiz);
    }
  }
}
