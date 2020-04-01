import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { IRegion } from '@models/region.interface';
import { PlacesTreeProvider } from '@models/places-tree-provider.class';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';
import { CountryService } from '@services/country/country.service';
import { SelectService } from '@services/select/select.service';

type TPlaceCounts = _.Dictionary<number>;

interface IRegionData {
  region: IRegion;
  treeProvider: PlacesTreeProvider;
}

interface IViewModel {
  regionData: IRegionData[];
  checkboxStates: TCheckboxStates;
  totals: TPlaceCounts;
  currents: TPlaceCounts;
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
  private totals$: Observable<TPlaceCounts>;
  private currents$: Observable<TPlaceCounts>;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.totals$,
      this.currents$
    ]).pipe(
      map(([regionData, checkboxStates, totals, currents]) =>
        ({regionData, checkboxStates, totals, currents})
      )
    );
  }

  onCountriesChange(state: TCheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onSelectAll(totals: TPlaceCounts): void {
    const newCheckboxStates = _(totals)
      .mapValues(() => "checked")
      .omitBy((_, key) => key === this.overallTotalKey)
      .value() as TCheckboxStates;
    this.selectService.updateCountries(newCheckboxStates);
  }

  onClearAll(): void {
    this.selectService.updateCountries({});
  }

  private initializeStreams(): void {
    this.regionData$ = this.countryService.getFormattedData().pipe(
      map(regions => regions.map(region => {
        const treeProvider = new PlacesTreeProvider(region);
        return { region, treeProvider };
      }))
    );
    this.checkboxStates$ = this.selectService.selection.observe(lens => lens.to('countries'));
    this.totals$ = this.regionData$.pipe(
      map(regionData => regionData.reduce((totalsDict, regionData) => {
        const region = regionData.region;
        const regionTotal = region.subregions.reduce((regionTotal, subregion) => {
          const subregionTotal = subregion.countries.length;
          totalsDict[subregion.name] = subregionTotal;
          return regionTotal + subregionTotal;
        }, 0);
        totalsDict[region.name] = regionTotal;
        totalsDict[this.overallTotalKey] += regionTotal;
        return totalsDict;
      }, { [this.overallTotalKey]: 0 } as TPlaceCounts))
    );
    this.currents$ = combineLatest([
      this.regionData$,
      this.checkboxStates$,
      this.totals$,
    ]).pipe(
      map(([regionData, checkboxStates, totals]) => {
        return _.reduce(regionData, (currentsDict, regionDatum) => {
          const region = regionDatum.region;
          const regionState = checkboxStates[region.name];
          let current = 0;
          if (regionState === "checked" || regionState === "unchecked") {
            current = this.getCurrentValueOfId(region.name, checkboxStates, totals);
          } else if (regionState === "indeterminate") {
            const subregionsTotal = region.subregions.reduce((total, subregion) => {
              return total + this.getCurrentValueOfId(subregion.name, checkboxStates, totals);
            }, 0);
            current = subregionsTotal;
          }
          currentsDict[region.name] = current;
          currentsDict[this.overallTotalKey] += current;
          return currentsDict;
        }, { [this.overallTotalKey]: 0 } as TPlaceCounts);
      })
    )
  }

  private getCurrentValueOfId(id: string, checkboxStates: TCheckboxStates, totals: TPlaceCounts): number {
    const state = checkboxStates[id];
    return state === "checked" ? totals[id] : 0;
  }
}
