import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICountry } from '@models/country.interface';

@Component({
  selector: 'app-explore-country',
  templateUrl: './explore-country.component.html',
  styleUrls: ['./explore-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreCountryComponent {
  @Input() country: ICountry;
  @Input() summary: string;
}
