import { Component, OnInit } from '@angular/core';
import { Country } from '../data/country.interface';
import { CountryService } from '../country/country.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {
  countriesByName: _.Dictionary<Country>;
  countriesByRegion: _.Dictionary<Country[]>;
  countriesBySubRegion: _.Dictionary<Country[]>;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countriesByName = this.countryService.keyCountriesByProperty('name');
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubRegion = this.countryService.groupCountriesByProperty('subregion');

    console.log('countries by name:', this.countriesByName);
    console.log('countries by region:', this.countriesByRegion);
    console.log('countries by subregion:', this.countriesBySubRegion);
  }

}
