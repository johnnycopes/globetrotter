import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';

import { Store } from 'src/app/shared/model/store.class';
import { Selection } from 'src/app/shared/model/selection.class';
import { Region } from 'src/app/shared/model/region.interface';
import { CountryService } from '../country/country.service';
import { QuizType } from 'src/app/shared/model/quiz-type.enum';
import { CheckboxStates } from 'src/app/shared/components/nested-checkboxes/nested-checkboxes.component';
import { QuizQuantity } from 'src/app/shared/model/quiz-quantity.type';

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
    this.store = new Store(new Selection());
    this.countryService.getFormattedData()
      .pipe(
        first()
      )
      .subscribe(
        regions => {
          const countries = this.mapCountriesToCheckboxStates(regions);
          this.updateCountries(countries);
        }
      );
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

  updateQuantity(quantity: number | null): void {
    this.store.set(['quantity'], quantity);
  }

  updateCountries(countries: CheckboxStates): void {
    this.store.set(['countries'], countries);
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
    const typeKey = _.camelCase(queryParams.type) as keyof typeof QuizType;
    const type = QuizType[typeKey];
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
    }, {} as CheckboxStates);
    return {
      type,
      quantity,
      countries
    };
  }

  private mapCountriesToCheckboxStates(countries: Region[]): CheckboxStates {
    return _.reduce(countries, (accum, region) => {
      accum[region.name] = 'checked';
      _.forEach(region.subregions, subregion => {
        accum[subregion.name] = 'checked';
      })
      return accum;
    }, {} as CheckboxStates);
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

  private isQuizQuantity(quantityParm: number | null): quantityParm is QuizQuantity {
    const isValid =
      quantityParm === 5 ||
      quantityParm === 10 ||
      quantityParm === 15 ||
      quantityParm === 20;
    return isValid;
  }
}
