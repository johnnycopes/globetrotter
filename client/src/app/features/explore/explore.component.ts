import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';

import { fadeInAnimation } from 'src/app/shared/utility/animations';
import { CountryService } from 'src/app/core/services/country/country.service';
import { Country } from 'src/app/shared/model/country.interface';

interface ViewModel {
  countries: Country[];
  selectedCountry: Country;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  animations: [fadeInAnimation]
})
export class ExploreComponent implements OnInit {
  vm$: Observable<ViewModel>;
  private countries$: Observable<Country[]>;
  private selectedCountry$: Observable<Country>;
  private selectedCountryChange = new ReplaySubject<Country>(1);

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.countries$,
      this.selectedCountry$
    ]).pipe(
      map(([countries, selectedCountry]) => ({ countries, selectedCountry }))
    );
  }

  getCountryCode(country: Country): string {
    return country.cioc;
  }

  onSelect(selectedCountry: Country): void {
    this.selectedCountryChange.next(selectedCountry);
  }

  private initializeStreams(): void {
    this.countries$ = this.countryService.getCountries().pipe(
      distinctUntilChanged(),
      tap(countries => this.selectedCountryChange.next(countries[0]))
    );
    this.selectedCountry$ = this.selectedCountryChange.asObservable().pipe(
      distinctUntilChanged()
    );
  }
}
