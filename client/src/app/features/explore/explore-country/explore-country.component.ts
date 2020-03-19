import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICountry } from 'src/app/shared/model/country.interface';

@Component({
  selector: 'app-explore-country',
  templateUrl: './explore-country.component.html',
  styleUrls: ['./explore-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreCountryComponent implements OnInit {
  @Input() country: ICountry;
  @Input() summary: string;

  constructor() { }

  ngOnInit(): void {
  }

}
