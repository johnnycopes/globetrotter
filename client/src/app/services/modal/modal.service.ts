import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@models/store.class';
import { Modal } from '@models/modal.class';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly store: Store;

  constructor() {
    this.store = new Store(new Modal());
  }

  getOpen(): Observable<boolean> {
    return this.store.get(['open']);
  }

  getMessage(): Observable<string> {
    return this.store.get(['message']);
  }

  setOpen(open: boolean): void {
    this.store.set(['open'], open);
  }

  setMessage(message: string): void {
    this.store.set(['message'], message);
  }
}
