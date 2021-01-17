import { Injectable } from '@angular/core';
import { State, IStateReadOnly } from '@boninger-works/state/library/core';
import { first } from 'rxjs/operators';

import { ISelection } from '@models/selection.interface';
import { IRegion } from '@models/region.interface';
import { EQuizType } from '@models/quiz-type.enum';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '../country/country.service';
import { replace, camelCase, pickBy, map as _map } from "lodash-es";
import { Dictionary } from "lodash";

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private readonly paramDict = {
    checked: '_c',
    indeterminate: '_i'
  };
  private readonly _selection: State<ISelection>;
  get selection(): IStateReadOnly<ISelection> {
    return this._selection;
  }

  constructor(private countryService: CountryService) {
    this._selection = new State({
      type: EQuizType.flagsCountries,
      quantity: 5,
      countries: {}
    });
    this.countryService.countries
      .observe(lens => lens.to('nestedCountries'))
      .pipe(first())
      .subscribe(
        regions => {
          const countries = this.mapCountriesToCheckboxStates(regions);
          this.updateCountries(countries);
        }
      );
  }

  updateSelection(selection: ISelection): void {
    this._selection.setRoot(selection);
  }

  updateType(type: EQuizType): void {
    this._selection.set(lens => lens.to('type').value(type));
  }

  updateQuantity(quantity: number): void {
    this._selection.set(lens => lens.to('quantity').value(quantity));
  }

  updateCountries(countries: TCheckboxStates): void {
    this._selection.set(lens => lens.to('countries').value(countries));
  }

  mapSelectionToQueryParams(selection: ISelection): _.Dictionary<string> {
    const type = selection.type.toString();
    const quantity = selection.quantity.toString();
    const selectedCountries = pickBy(selection.countries, value => value !== 'unchecked');
    const countries = _map(selectedCountries, (value, key) => {
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

  mapQueryParamsToSelection(queryParams: Dictionary<string>): ISelection {
    const typeKey = camelCase(queryParams.type) as keyof typeof EQuizType;
    const type = EQuizType[typeKey];
    const quantity = parseInt(queryParams.quantity, 10);
    const countries = queryParams.countries
      .split(',')
      .reduce((accum, current) => {
        if (current.includes(this.paramDict.checked)) {
          const updatedKey = replace(current, this.paramDict.checked, '');
          accum[updatedKey] = 'checked';
        } else if (current.includes(this.paramDict.indeterminate)) {
          const updatedKey = replace(current, this.paramDict.indeterminate, '');
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
    return countries.reduce((accum, region) => {
      accum[region.name] = 'checked';
      region.subregions.forEach(subregion => {
        accum[subregion.name] = 'checked';
      });
      return accum;
    }, {} as TCheckboxStates);
  }
}
