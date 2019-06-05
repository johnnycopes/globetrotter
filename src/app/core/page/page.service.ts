import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Pages } from 'src/app/model/pages.enum';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private storeService: StoreService
  ) { }

  reset(): void {
    this.storeService.set(['page'], Pages.home);
  }

  nextPage(): void {
    this.storeService.transform(['page'], (page) => {
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
