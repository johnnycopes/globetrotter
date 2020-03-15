import { Component, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject, combineLatest } from 'rxjs';
import { map, tap, switchMap, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { fadeInAnimation } from 'src/app/shared/utility/animations';
import { CountryService } from 'src/app/core/services/country/country.service';
import { ICountry } from 'src/app/shared/model/country.interface';
import { ListDetailsStyles } from 'src/app/shared/components/list-details/list-details.component';

interface ViewModel {
  filteredCountries: ICountry[];
  selectedCountry: ICountry;
  searchTerm: string;
  summary: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  animations: [fadeInAnimation]
})
export class ExploreComponent implements OnInit {
  styles: ListDetailsStyles = {
    heightOffset: '96px',
    gap: '12px'
  };
  vm$: Observable<ViewModel>;
  private countries$: Observable<ICountry[]>;
  private filteredCountries$: Observable<ICountry[]>;
  private searchTerm$: Observable<string>;
  private searchTermChange$ = new Subject<string>();
  private selectedCountry$: Observable<ICountry>;
  private selectedCountryChange$ = new ReplaySubject<ICountry>(1);
  private summary$: Observable<string>;
  private summaryChange$ = new ReplaySubject<string>(1);

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.filteredCountries$,
      this.selectedCountry$,
      this.searchTerm$,
      this.summary$
    ]).pipe(
      map(([filteredCountries, selectedCountry, searchTerm, summary]) => ({ filteredCountries, selectedCountry, searchTerm, summary }))
    );
  }

  getCountryCode(country: ICountry): string {
    return country.cioc;
  }

  onSelect(selectedCountry: ICountry): void {
    this.selectedCountryChange$.next(selectedCountry);
    this.countryService.getSummary(selectedCountry.name).pipe(
      map(summary => this.summaryChange$.next(summary))
    ).subscribe();
  }

  onSearch(searchTerm: string) {
    this.searchTermChange$.next(searchTerm);
  }

  private initializeStreams(): void {
    this.selectedCountry$ = this.selectedCountryChange$.asObservable().pipe(
      distinctUntilChanged()
    );
    this.searchTerm$ = this.searchTermChange$.asObservable().pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged()
    );
    this.summary$ = this.summaryChange$.asObservable().pipe(
      distinctUntilChanged()
    );
    this.countries$ = this.countryService.getCountries().pipe(
      distinctUntilChanged()
    );
    this.filteredCountries$ = this.searchTerm$.pipe(
      map(searchTerm => _.toLower(searchTerm)),
      switchMap((searchTerm, index) => this.countries$.pipe(
        tap(countries => index === 0 ? this.onSelect(countries[0]) : null),
        map(countries => {
          return _.filter(countries, country => {
            const name = _.toLower(country.name);
            const capital = _.toLower(country.capital);
            return name.includes(searchTerm) || capital.includes(searchTerm);
          });
        })
      )
    ));
  }
}
