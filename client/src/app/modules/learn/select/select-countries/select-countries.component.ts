import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest, of, ReplaySubject } from 'rxjs';
import { map, tap, count } from 'rxjs/operators';
import * as _ from 'lodash';

import { IRegion } from '@models/region.interface';
import { PlacesTreeProvider } from '@models/places-tree-provider.class';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '@services/country/country.service';
import { SelectService } from '@services/select/select.service';
import { ISubregion } from '@models/subregion.interface';
import { INestedCheckboxesCounts } from '@shared/components/nested-checkboxes-with-counts/nested-checkboxes-with-counts.component';
import { State } from '@boninger-works/state';

interface IRegionData {
  region: IRegion;
  treeProvider: PlacesTreeProvider;
}

interface IViewModel {
  regionData: IRegionData[];
  checkboxStates: TCheckboxStates;
  countData: TCountData;
  overallCountData: INestedCheckboxesCounts;
}

type TCountData = _.Dictionary<INestedCheckboxesCounts>;

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCountriesComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private regionData$: Observable<IRegionData[]>;
  private checkboxStates$: Observable<TCheckboxStates>;
  private countData$: Observable<TCountData>;
  private countData: State<TCountData> = new State({});
  private overallCountData$: Observable<INestedCheckboxesCounts>;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.countData$,
      this.overallCountData$
    ]).pipe(
      map(([regionData, checkboxStates, countData, overallCountData]) =>
        ({ regionData, checkboxStates, countData, overallCountData })
      )
    );
  }

  onCountriesChange(state: TCheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onCountsChange(counts: INestedCheckboxesCounts, regionName: string): void {
    this.countData.set(lens => lens.to(regionName).set(counts));
  }

  onSelectAll(totals: any): void {
    // const newCheckboxStates = _(totals)
    //   .mapValues(() => "checked")
    //   .omitBy((_, key) => key === this.overallTotalKey)
    //   .value() as TCheckboxStates;
    // this.selectService.updateCountries(newCheckboxStates);
  }

  onClearAll(): void {
    this.selectService.updateCountries({});
  }

  getNumberOfCountries(item: ISubregion): number {
    return item.countries.length;
  }

  private initializeStreams(): void {
    this.regionData$ = this.countryService.countries
      .observe(lens => lens.to('nestedCountries'))
      .pipe(
        tap(regions => {
          const countsDict = regions.reduce((countsDict, region) => {
            countsDict[region.name] = { selected: 0, total: 0 };
            return countsDict;
          }, {} as TCountData);
          this.countData.set(countsDict);
        }),
        map(regions => regions.map(region => {
          const treeProvider = new PlacesTreeProvider(region);
          return { region, treeProvider };
        }))
      );
    this.checkboxStates$ = this.selectService.selection.observe(lens => lens.to('countries'));
    this.countData$ = this.countData.observe();
    this.overallCountData$ = this.countData.observe().pipe(
      map(countData => {
        console.log(countData);
        return _.reduce(countData, (accum, current) => {
          accum.selected += current.selected;
          accum.total += current.total;
          return accum;
        }, { selected: 0, total: 0} as INestedCheckboxesCounts);
      })
    );
  }
}
