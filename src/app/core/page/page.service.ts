import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '../store/store.service';
import { Pages } from 'src/app/model/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private storeService: StoreService) { }

  reset(): void {
    this.storeService.set(['page'], Pages.home);
  }

  getPage(): Observable<Pages> {
    return this.storeService.get(['page']);
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
