import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { IRegion } from '@models/region.interface';
import { PlacesTreeProvider } from '@models/places-tree-provider.class';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '@services/country/country.service';
import { SelectService } from '@services/select/select.service';
import { ISubregion } from '@models/subregion.interface';

type TPlaceCounts = _.Dictionary<number>;

interface IRegionData {
  region: IRegion;
  treeProvider: PlacesTreeProvider;
}

interface IViewModel {
  regionData: IRegionData[];
  checkboxStates: TCheckboxStates;
}

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCountriesComponent implements OnInit {
  vm$: Observable<IViewModel>;
  readonly overallTotalKey: string = '__overall';
  private regionData$: Observable<IRegionData[]>;
  private checkboxStates$: Observable<TCheckboxStates>;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$
    ]).pipe(
      map(([regionData, checkboxStates]) =>
        ({ regionData, checkboxStates })
      )
    );
  }

  onCountriesChange(state: TCheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onSelectAll(totals: TPlaceCounts): void {
    // const newCheckboxStates = _(totals)
    //   .mapValues(() => "checked")
    //   .omitBy((_, key) => key === this.overallTotalKey)
    //   .value() as TCheckboxStates;
    // this.selectService.updateCountries(newCheckboxStates);
  }

  onClearAll(): void {
    this.selectService.updateCountries({});
  }

  getTotalCount(item: ISubregion): number {
    return item.countries.length;
  }

  private initializeStreams(): void {
    this.regionData$ = this.countryService.countries
      .observe(lens => lens.to('nestedCountries'))
      .pipe(
        map(regions => regions.map(region => {
          const treeProvider = new PlacesTreeProvider(region);
          return { region, treeProvider };
        }))
      );
    this.checkboxStates$ = this.selectService.selection.observe(lens => lens.to('countries'));
  }
}
