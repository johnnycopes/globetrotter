import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, combineLatest } from "rxjs";
import { map, tap, distinctUntilChanged } from "rxjs/operators";
import { pickBy } from "lodash-es";

import { ERoute } from "@models/enums/route.enum";
import { ISelection, ISelectionParams } from "@models/interfaces/selection.interface";
import { SelectService } from "@services/select.service";
import { fadeInAnimation } from "@utility/animations";
import { CountryService } from "@services/country.service";

interface IViewModel {
  numberOfSelectedCountries: number;
  quantity: number;
  invalidQuantity: boolean;
}

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class SelectComponent implements OnInit {
  public vm$: Observable<IViewModel>;
  private _queryParams: ISelectionParams;
  private _selection: ISelection;
  private _selection$: Observable<ISelection>;
  private _quantity$: Observable<number>;
  private _invalidQuantity$: Observable<boolean>;
  private _numberOfSelectedCountries$: Observable<number>;

  constructor(
    private _countryService: CountryService,
    private _selectService: SelectService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this._initializeSubscriptions();
    this.vm$ = combineLatest([
      this._numberOfSelectedCountries$,
      this._quantity$,
      this._invalidQuantity$
    ]).pipe(
      map(([numberOfSelectedCountries, quantity, invalidQuantity]) =>
        ({ numberOfSelectedCountries, quantity, invalidQuantity })
      )
    );
  }

  public async onLaunch(): Promise<void> {
    this._queryParams = this._selectService.mapSelectionToQueryParams(this._selection);
    await this._router.navigate(
      [`${ERoute.learn}/${ERoute.quiz}`],
      { queryParams: this._queryParams }
    );
  }

  private _initializeSubscriptions(): void {
    this._selection$ = this._selectService.selection.observe().pipe(
      tap(selection => this._selection = selection)
    );
    this._quantity$ = this._selectService.selection.observe(lens => lens.to("quantity"));
    this._numberOfSelectedCountries$ = combineLatest([
      this._countryService.countries.observe(lens => lens.to("countriesBySubregion")),
      this._selection$
    ]).pipe(
      map(([subregions, selection]) => {
        const selectedCountries = pickBy(selection.countries, value => value === "checked");
        return Object
          .keys(selectedCountries)
          .reduce((total, currentPlace) =>
            subregions[currentPlace] ? total + subregions[currentPlace].length : total
          , 0);
      }),
      distinctUntilChanged()
    );
    this._invalidQuantity$ = combineLatest([
      this._numberOfSelectedCountries$,
      this._quantity$
    ]).pipe(
      map(([numberOfSelectedCountries, quantity]) => {
        return numberOfSelectedCountries <= 1 || quantity < 2 || quantity > numberOfSelectedCountries;
      }),
      distinctUntilChanged()
    );
  }
}
