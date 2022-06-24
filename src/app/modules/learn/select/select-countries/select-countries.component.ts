import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, first, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';

import { IRegion } from '@models/interfaces/region.interface';
import { ISubregion } from '@models/interfaces/subregion.interface';
import { PlacesTreeProvider } from '@models/classes/places-tree-provider.class';
import { CheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '@services/country.service';
import { SelectService } from '@services/select.service';

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
  checkboxStates: CheckboxStates;
  overallSelected: number;
  overallTotal: number;
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
  private checkboxStates$: Observable<CheckboxStates>;
  private overallSelected$: Observable<number>;
  private overallTotal$: Observable<number>;
  private fullySelectedState: CheckboxStates;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.overallSelected$,
      this.overallTotal$
    ]).pipe(
      map(([regionData, checkboxStates, overallSelected, overallTotal]) =>
        ({ regionData, checkboxStates, overallSelected, overallTotal  })
      )
    );
  }

  onCountriesChange(state: CheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onSelectAll(): void {
    this.selectService.updateCountries(this.fullySelectedState);
  }

  onClearAll(): void {
    this.selectService.updateCountries({});
  }

  getNumberOfCountries(item: ISubregion): number {
    return item.countries.length;
  }

  private initializeStreams(): void {
    this.checkboxStates$ = this.selectService.selection.observe(lens => lens.to('countries'));
    this.regionData$ = this.countryService.countries
      .pipe(
        first(),
        map(({ nestedCountries }) => nestedCountries),
        tap(regions => {
          this.fullySelectedState = regions.reduce((states, region) => {
            states[region.name] = 'checked';
            region.subregions.forEach(subregion => states[subregion.name] = 'checked');
            return states;
          }, {} as CheckboxStates);
        }),
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
    this.overallSelected$ = this.regionData$.pipe(
      map(regionData => regionData.map(regionDatum => regionDatum.selected$)),
      switchMap(selectedArr$ => combineLatest(selectedArr$).pipe(
        map(([...values]) => values.reduce((accum, current) => accum + current, 0))
      )),
      distinctUntilChanged()
    );
    this.overallTotal$ = this.regionData$.pipe(
      map(regionData => regionData.map(regionDatum => regionDatum.total$)),
      switchMap(totals$ => combineLatest(totals$).pipe(
        map(([...values]) => values.reduce((accum, current) => accum + current, 0))
      )),
      distinctUntilChanged()
    );
  }
}
