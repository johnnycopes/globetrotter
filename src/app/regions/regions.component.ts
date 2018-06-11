import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';
import { Country, CountryDictionary } from '../data/country.interface';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {
  countries: Country[];
  countriesKeyedByName: CountryDictionary;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.countries = this.quizService.selectRegion('Europe');
    console.log(this.countries);
    
    this.countriesKeyedByName = this.quizService.keyCountriesByProperty('name');
    console.log(this.countriesKeyedByName);
  }

}
