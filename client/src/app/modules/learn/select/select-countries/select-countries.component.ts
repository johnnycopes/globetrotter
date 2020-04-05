import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, first, distinctUntilChanged, pluck, switchMap, mergeMap, shareReplay } from 'rxjs/operators';
import { State } from '@boninger-works/state/library/core';
import * as _ from 'lodash';

import { IRegion } from '@models/region.interface';
import { ISubregion } from '@models/subregion.interface';
import { PlacesTreeProvider } from '@models/places-tree-provider.class';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '@services/country/country.service';
import { SelectService } from '@services/select/select.service';

interface IRegionData {
  region: IRegion;
  treeProvider: PlacesTreeProvider;
  selectedSubject: BehaviorSubject<number>;
  totalSubject: BehaviorSubject<number>;
  selected$: Observable<number>;
  total$: Observable<number>;
}

interface IViewModel {
  regionData: IRegionData[];
  checkboxStates: TCheckboxStates;
  overallSelected: number;
  // overallCountData: INestedCheckboxesCounts;
}

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
  private overallSelected$: Observable<number>;
  private overallTotal$: Observable<number>;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.overallSelected$
    ]).pipe(
      map(([regionData, checkboxStates, overallSelected ]) =>
        ({ regionData, checkboxStates, overallSelected  })
      )
    );
  }

  onCountriesChange(state: TCheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onSelectAll(totals: any): void {
    // TODO: fix this
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
        first(),
        map(regions => regions.map(region => {
          const treeProvider = new PlacesTreeProvider(region);
          const selectedSubject = new BehaviorSubject<number>(0);
          const totalSubject = new BehaviorSubject<number>(0);
          const selected$ = selectedSubject.asObservable().pipe(
            distinctUntilChanged()
          );
          const total$ = totalSubject.asObservable().pipe(
            distinctUntilChanged()
          );
          return { region, treeProvider, selectedSubject, totalSubject, selected$, total$ };
        })),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    this.checkboxStates$ = this.selectService.selection.observe(lens => lens.to('countries'));
    this.overallSelected$ = this.regionData$.pipe(
      switchMap(regionData => regionData[0].selected$),
      tap(console.log)
    );
  }
}
