import { Injectable } from '@angular/core';
import { CountryService } from '../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private countryService: CountryService) { }
}
