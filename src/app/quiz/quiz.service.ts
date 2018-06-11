import { Injectable } from '@angular/core';
import { COUNTRIES } from '../data/countries';
import { Country, CountryDictionary } from '../data/country.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  countries: Country[] = COUNTRIES;

  constructor() { }

  print() {
    console.log('service works');
    console.log(this.countries[0]);
  }

  selectRegion(region: string): Country[] {
    return this.countries
      .filter(country => country.region === region);
  }

  keyCountriesByProperty(property: string): CountryDictionary {
    const countriesByKey = {};
    this.countries
      .forEach(country => {
        const value = country[property];
        countriesByKey[value] = country;
      });
    return countriesByKey;
  }
}
