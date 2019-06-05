import { Observable, BehaviorSubject, Subject } from "rxjs";
import * as _ from 'lodash';
import { map, distinctUntilChanged } from "rxjs/operators";

export class Store {

  private subject$: BehaviorSubject<any>;

  constructor(initialState: any) {
    this.subject$ = new BehaviorSubject(initialState);
  }

  get(path: string[]): Observable<any> {
    return this.subject$.pipe(
      map((state) => _.get(state, path)),
      distinctUntilChanged()
    );
  }

  set(path: string[], value: any): void {
    _.set(this.subject$.value, path, value);
    this.subject$.next(this.subject$.value);
  }

  get data(): any {
      return this.subject$.value;
  }

  transform(path: string[], transformer: (value: any) => any): void {
    const oldValue = _.get(this.data, path);
    const newValue = transformer(oldValue);
    _.set(this.data, path, newValue);
    this.subject$.next(this.data);
  }
}
