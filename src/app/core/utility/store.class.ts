import { Observable, BehaviorSubject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import * as _ from 'lodash';

export class Store {

  public data$: BehaviorSubject<any>;

  constructor(initialState: any) {
    this.data$ = new BehaviorSubject(initialState);
  }

  get data(): any {
    return this.data$.value;
  }

  get(path: string[]): Observable<any> {
    return this.data$.pipe(
      map((state) => _.get(state, path)),
      distinctUntilChanged()
    );
  }

  set(path: string[], value: any): void {
    _.set(this.data$.value, path, value);
    this.data$.next(this.data$.value);
  }

  transform(path: string[], transformer: (value: any) => any): void {
    const oldValue = _.get(this.data, path);
    const newValue = transformer(oldValue);
    _.set(this.data, path, newValue);
    this.data$.next(this.data);
  }
}
