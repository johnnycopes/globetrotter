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
    if (!path.length) {
      return this.data$;
    }
    return this.data$.pipe(
      map(state => _.get(state, path)),
      distinctUntilChanged()
    );
  }

  set(path: string[], value: any): void {
    if (!path.length) {
      this.data$.next(value);
      return;
    }
    _.set(this.data$.value, path, value);
    this.data$.next(this.data$.value);
  }

  transform(path: string[], transformer: (value: any) => any): void {
    if (!path.length) {
      const oldValue = this.data;
      const newValue = transformer(oldValue);
      this.data$.next(newValue);
      return;
    }
    const oldValue = _.get(this.data, path);
    const newValue = transformer(oldValue);
    _.set(this.data, path, newValue);
    this.data$.next(this.data);
  }
}
