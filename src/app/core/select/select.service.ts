import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Store } from 'src/app/model/store.class';
import { Selection } from 'src/app/model/selection.class';
import { CountryService } from '../country/country.service';
import { QuizType } from 'src/app/model/quiz-type.enum';
import { CheckboxStates } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { QuizQuantity } from 'src/app/model/quiz-quantity.type';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private readonly store: Store;
  private readonly paramDict = {
    checked: '_c',
    indeterminate: '_i'
  };

  constructor(private countryService: CountryService) {
    const type = QuizType.flagsCountries;
    const quantity = 5;
    const countries = this.mapCountriesToCheckboxStates();
    this.store = new Store(new Selection(
      type,
      quantity,
      countries
    ));
  }

  getSelection(): Observable<Selection> {
    return this.store.get([]);
  }

  updateSelection(selection: Selection): void {
    const { type, quantity, countries } = selection;
    this.updateType(type);
    this.updateQuantity(quantity);
    this.updateCountries(countries);
  }

  updateType(type: QuizType): void {
    this.store.set(['type'], type);
  }

  updateQuantity(quantity: number): void {
    this.store.set(['quantity'], quantity);
  }

  updateCountries(countries: CheckboxStates): void {
    this.store.set(['countries'], countries);
  }

  mapCountriesToCheckboxStates(): CheckboxStates {
    return _.reduce(this.countryService.data, (accum, region) => {
      accum[region.name] = 'checked';
      _.forEach(region.subregions, subregion => {
        accum[subregion.name] = 'checked';
      })
      return accum;
    }, {});
  }

  mapSelectionToQueryParams(selection: Selection): _.Dictionary<string> {
    const type = _.toString(selection.type);
    const quantity = _.toString(selection.quantity);
    const countries = _(selection.countries)
      .pickBy((state) => state !== 'unchecked')
      .map((value, key) => {
        if (value === 'checked') {
          return key + this.paramDict.checked;
        } else if (value === 'indeterminate') {
          return key + this.paramDict.indeterminate;
        } else {
          return;
        }
      })
      .join(',');
    return {
      type,
      quantity,
      countries
    };
  }

  mapQueryParamsToSelection(queryParams: _.Dictionary<string>): Selection {
    const type = QuizType[_.camelCase(queryParams.type)];
    const quantity = this.convertQuantityParamToQuizQuantity(queryParams.quantity);
    const countries = _.reduce(queryParams.countries.split(','), (accum, current) => {
      if (current.includes(this.paramDict.checked)) {
        const updatedKey = _.replace(current, this.paramDict.checked, '');
        accum[updatedKey] = 'checked';
      }
      else if (current.includes(this.paramDict.indeterminate)) {
        const updatedKey = _.replace(current, this.paramDict.indeterminate, '');
        accum[updatedKey] = 'indeterminate';
      }
      return accum;
    }, {});
    return {
      type,
      quantity,
      countries
    };
  }

  private convertQuantityParamToQuizQuantity(quantityParam: string): QuizQuantity {
    const paramAsNumber = _.toNumber(quantityParam);
    if (!quantityParam) {
      return null;
    }
    else if (this.isQuizQuantity(paramAsNumber)) {
      return paramAsNumber;
    }
    else {
      return 5;
    }
  }

  private isQuizQuantity(quantityParm: number): quantityParm is QuizQuantity {
    const isValid =
      quantityParm === 5 ||
      quantityParm === 10 ||
      quantityParm === 15 ||
      quantityParm === 20;
    return isValid;
  }
}
