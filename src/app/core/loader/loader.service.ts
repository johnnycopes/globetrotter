import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoader(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  show(): void {
    this.loading$.next(true);
  }

  hide(): void {
    this.loading$.next(false);
  }
}
