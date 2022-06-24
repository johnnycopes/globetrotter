import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { first, map } from "rxjs/operators";
import { replace, omitBy, map as _map } from "lodash-es";

import { ISelection, ISelectionParams } from "@models/interfaces/selection.interface";
import { IRegion } from "@models/interfaces/region.interface";
import { EQuizType } from "@models/enums/quiz-type.enum";
import { CheckboxState } from "@shared/components/checkbox/checkbox.component";
import { CheckboxStates } from "@shared/components/nested-checkboxes/nested-checkboxes.component";
import { CountryService } from "./country.service";

@Injectable({
  providedIn: "root"
})
export class SelectService {
  private readonly _paramDict: Record<CheckboxState, string> = {
    checked: "_c",
    indeterminate: "_i",
    unchecked: "",
  };
  private readonly _selection: BehaviorSubject<ISelection>;
  get selection(): BehaviorSubject<ISelection> {
    return this._selection;
  }

  constructor(private _countryService: CountryService) {
    this._selection = new BehaviorSubject({
      type: EQuizType.flagsCountries,
      quantity: 5,
      countries: {}
    });
    this._countryService.countries
      .pipe(
        first(),
        map(({ nestedCountries }) => nestedCountries),
      )
      .subscribe(
        regions => {
          const countries = this._mapCountriesToCheckboxStates(regions);
          this.updateCountries(countries);
        }
      );
  }

  public updateSelection(selection: ISelection): void {
    this._selection.next(selection);
  }

  public updateType(type: EQuizType): void {
    this._selection.pipe(
      first(),
      map(selection => ({ ...selection, type }))
    ).subscribe(selection => this._selection.next(selection));
  }

  public updateQuantity(quantity: number): void {
    this._selection.pipe(
      first(),
      map(selection => ({ ...selection, quantity }))
    ).subscribe(selection => this._selection.next(selection));
  }

  public updateCountries(countries: CheckboxStates): void {
    this._selection.pipe(
      first(),
      map(selection => ({ ...selection, countries }))
    ).subscribe(selection => this._selection.next(selection));
  }

  public mapSelectionToQueryParams(selection: ISelection): ISelectionParams {
    const type = selection.type.toString();
    const quantity = selection.quantity.toString();
    const selectedCountries = omitBy(selection.countries, value => value === "unchecked");
    const countries = _map(selectedCountries,
      (value, key) => key + this._paramDict[value]
    ).join(",");
    return {
      type,
      quantity,
      countries
    };
  }

  public mapQueryParamsToSelection(queryParams: ISelectionParams): ISelection {
    const type = parseInt(queryParams.type, 10) as EQuizType;
    const quantity = parseInt(queryParams.quantity, 10);
    const countries = queryParams.countries
      .split(",")
      .reduce((accum, current) => {
        if (current.includes(this._paramDict.checked)) {
          const updatedKey = replace(current, this._paramDict.checked, "");
          accum[updatedKey] = "checked";
        } else if (current.includes(this._paramDict.indeterminate)) {
          const updatedKey = replace(current, this._paramDict.indeterminate, "");
          accum[updatedKey] = "indeterminate";
        }
        return accum;
      }, {} as CheckboxStates);
    return {
      type,
      quantity,
      countries
    };
  }

  private _mapCountriesToCheckboxStates(countries: IRegion[]): CheckboxStates {
    return countries.reduce((accum, region) => {
      accum[region.name] = "checked";
      region.subregions.forEach(subregion => {
        accum[subregion?.name] = "checked";
      });
      return accum;
    }, {} as CheckboxStates);
  }
}
