import { Component, OnInit } from '@angular/core';
import { Country } from '../data/country.interface';
import { CountryService } from '../country/country.service';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.scss']
})
export class CountrySelectionComponent implements OnInit {
  public countriesByRegion: _.Dictionary<Country[]>;
  public subregionsByRegion: _.Dictionary<String[]>;
  public regions: string[];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.subregionsByRegion = this.countryService.groupSubregionsByRegion();
    this.regions = Object.keys(this.subregionsByRegion);
  }

}
