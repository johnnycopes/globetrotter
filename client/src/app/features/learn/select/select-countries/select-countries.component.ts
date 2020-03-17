import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { CountryService } from 'src/app/core/services/country/country.service';
import { SelectService } from 'src/app/core/services/select/select.service';
import { IRegion } from 'src/app/shared/model/region.interface';
import { PlacesTreeProviderRefactor } from 'src/app/shared/model/places-tree-provider-refactor.class';
import { TCheckboxStates } from 'src/app/shared/components/nested-checkboxes-refactor/nested-checkboxes-refactor.component';

interface IRegionData {
  region: IRegion;
  treeProvider: PlacesTreeProviderRefactor;
}

interface ViewModel {
  regionData: IRegionData[];
  checkboxStates: TCheckboxStates;
}

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  vm$: Observable<ViewModel>;
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
      map(([regionData, checkboxStates]) => ({regionData, checkboxStates}))
    );
  }

  onCountriesChange(state: TCheckboxStates): void {
    this.selectService.updateCountries(state);
  }

  onSelectAll(): void {
    this.selectService.updateCountries({});
  }

  onClearAll(): void {
    this.selectService.updateCountries({});
  }

  private initializeStreams(): void {
    this.regionData$ = this.countryService.getFormattedData().pipe(
      map(regions => regions.map(region => {
        const treeProvider = new PlacesTreeProviderRefactor(region);
        return { region, treeProvider };
      }))
    );
    this.checkboxStates$ = this.selectService.getSelection().pipe(
      map(selection => selection.countries)
    );
  }
}
