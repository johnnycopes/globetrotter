import { Injectable } from '@angular/core';
import { State } from '@boninger-works/state';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';

import { Selection } from '@models/selection.class';
import { IRegion } from '@models/region.interface';
import { EQuizType } from '@models/quiz-type.enum';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private readonly state: State<Selection>;
  private readonly paramDict = {
    checked: '_c',
    indeterminate: '_i'
  };

  constructor(private countryService: CountryService) {
    this.state = new State(new Selection());
    this.countryService.getFormattedData()
      .pipe(first())
      .subscribe(
        regions => {
          const countries = this.mapCountriesToCheckboxStates(regions);
          this.updateCountries(countries);
        }
      );
  }

  getSelection(): Observable<Selection> {
    return this.state.observe();
  }

  updateSelection(selection: Selection): void {
    const { type, quantity, countries } = selection;
    this.updateType(type);
    this.updateQuantity(quantity);
    this.updateCountries(countries);
  }

  updateType(type: EQuizType): void {
    this.state.set(lens => lens.to("type").set(type));
  }

  updateQuantity(quantity: number): void {
    this.state.set(lens => lens.to("quantity").set(quantity));
  }

  updateCountries(countries: TCheckboxStates): void {
    this.state.set(lens => lens.to("countries").set(countries));
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
    const typeKey = _.camelCase(queryParams.type) as keyof typeof EQuizType;
    const type = EQuizType[typeKey];
    const quantity = _.toNumber(queryParams.quantity);
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
    }, {} as TCheckboxStates);
    return {
      type,
      quantity,
      countries
    };
  }

  private mapCountriesToCheckboxStates(countries: IRegion[]): TCheckboxStates {
    return _.reduce(countries, (accum, region) => {
      accum[region.name] = 'checked';
      _.forEach(region.subregions, subregion => {
        accum[subregion.name] = 'checked';
      })
      return accum;
    }, {} as TCheckboxStates);
  }
}
