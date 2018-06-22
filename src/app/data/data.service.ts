import { Injectable } from '@angular/core';

import { FormModelObject } from '../selection/selection.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public selection: FormModelObject;

  constructor() { }
}
