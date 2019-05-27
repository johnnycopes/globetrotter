import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { CountryService } from 'src/app/core/country/country.service';
import { SelectService } from 'src/app/core/select/select.service';
import { CheckboxStates, TreeProvider, Renderer } from 'src/app/shared/nested-checkboxes/nested-checkboxes.component';
import { Place } from 'src/app/model/place.type';
import { Region } from 'src/app/model/region.interface';
import { PlacesTreeProvider } from 'src/app/model/places-tree-provider.class';
import { PlacesRenderer } from 'src/app/model/places-renderer.class';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent implements OnInit {
  regions: Region[];
  allChecked: boolean = true;
  canStartQuiz: boolean;
  treeProvider: TreeProvider<Place> = new PlacesTreeProvider();
  renderer: Renderer<Place> = new PlacesRenderer();
  private selectedCountries: CheckboxStates;

  constructor(
    private countryService: CountryService,
    private selectService: SelectService
  ) { }

  ngOnInit(): void {
    this.canStartQuiz = this.allChecked;
    this.regions = this.countryService.data;
  }

  onCountriesChange(model: CheckboxStates): void {
    this.selectedCountries = model;
    this.canStartQuiz = _.some(model, checkboxState => checkboxState === 'checked');
  }

  onClick(): void {
    this.selectService.updateCountries(this.selectedCountries);
    this.selectService.nextScreen();
  }
}
