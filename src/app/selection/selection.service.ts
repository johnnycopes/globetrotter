import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {


  constructor() { }

  createFormModel(arr: string[], initValue: boolean) {
    const formObj = {};
    _.forEach(arr, (value) => {
      formObj[value] = initValue;
    });
    return formObj;
  }
}
