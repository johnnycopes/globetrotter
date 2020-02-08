import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }

  // combineStreams<T>(streams: _.Dictionary<Observable<any>>): Observable<T> {
  //   const streamNames = _.keys(streams);
  //   const streams$ = _.values(streams);
  //   return combineLatest(streams$).pipe(
  //     map(streamValues => {
  //       const output = _.zipObject(streamNames, streamValues) as T;
  //       return output;
  //     })
  //   );
  // }

  // combineStuffUnsafeButVariable<T>(
  //   observables: Observable<any>[],
  //   transformer: (values: any[]) => T
  // ) {
  //   return combineLatest(observables).pipe(
  //     map(transformer)
  //   );
  // }

  combineFiveStreams<T1, T2, T3, T4, T5, TCombination>(
    observable1: Observable<T1>,
    observable2: Observable<T2>,
    observable3: Observable<T3>,
    observable4: Observable<T4>,
    observable5: Observable<T5>,
    transformer: (values: [T1, T2, T3, T4, T5]) => TCombination
  ) {
    return combineLatest([
      observable1,
      observable2,
      observable3,
      observable4,
      observable5
    ]).pipe(
      map(transformer)
    );
  }
}
