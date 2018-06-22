import { Component, OnInit, Input } from '@angular/core';

import { Country } from '../model/country.interface';
import { FormModelObject } from '../selection/selection.service';
import { CountryService } from '../country/country.service';
import { QuizService } from './quiz.service';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() selection: FormModelObject;
  public countriesByName: _.Dictionary<Country>;
  public countriesByRegion: _.Dictionary<Country[]>;
  public countriesBySubregion: _.Dictionary<Country[]>;

  constructor(
    private countryService: CountryService,
    private quizService: QuizService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.countriesByName = this.countryService.keyCountriesByProperty('name');
    this.countriesByRegion = this.countryService.groupCountriesByProperty('region');
    this.countriesBySubregion = this.countryService.groupCountriesByProperty('subregion');
  }
}
