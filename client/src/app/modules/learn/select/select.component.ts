import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { ERoute } from '@models/route.enum';
import { ISelection } from '@models/selection.interface';
import { SelectService } from '@services/select/select.service';
import { fadeInAnimation } from '@utility/animations';
import { CountryService } from '@services/country/country.service';

interface IViewModel {
  numberOfSelectedCountries: number;
  quantity: number;
  invalidQuantity: boolean;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class SelectComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private queryParams: _.Dictionary<string>;
  private selection: ISelection;
  private selection$: Observable<ISelection>;
  private quantity$: Observable<number>;
  private invalidQuantity$: Observable<boolean>;
  private numberOfSelectedCountries$: Observable<number>;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.vm$ = combineLatest([
      this.numberOfSelectedCountries$,
      this.quantity$,
      this.invalidQuantity$
    ]).pipe(
      map(([numberOfSelectedCountries, quantity, invalidQuantity]) =>
        ({ numberOfSelectedCountries, quantity, invalidQuantity })
      )
    );
  }

  onLaunch(): void {
    this.queryParams = this.selectService.mapSelectionToQueryParams(this.selection);
    this.router.navigate(
      [`${ERoute.learn}/${ERoute.quiz}`],
      { queryParams: this.queryParams }
    );
  }

  private initializeSubscriptions(): void {
    this.selection$ = this.selectService.selection.observe().pipe(
      tap(selection => this.selection = selection)
    );
    this.quantity$ = this.selectService.selection.observe(lens => lens.to('quantity'));
    this.numberOfSelectedCountries$ = combineLatest([
      this.countryService.countries.observe(lens => lens.to('countriesBySubregion')),
      this.selection$
    ]).pipe(
      map(([subregions, selection]) => {
        const selectedPlaces = _(selection.countries)
          .pickBy((value) => value === 'checked')
          .keys()
          .value();
        return _.reduce(selectedPlaces, (total, currentPlace) =>
          subregions[currentPlace] ? total + subregions[currentPlace].length : total
        , 0);
      }),
      distinctUntilChanged()
    );
    this.invalidQuantity$ = combineLatest([
      this.numberOfSelectedCountries$,
      this.quantity$
    ]).pipe(
      map(([numberOfSelectedCountries, quantity]) => {
        return numberOfSelectedCountries <= 1 || quantity < 2 || quantity > numberOfSelectedCountries;
      }),
      distinctUntilChanged()
    );
  }
}
