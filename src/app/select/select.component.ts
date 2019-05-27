import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { SelectService } from './select.service';
import { Pages } from 'src/app/model/pages.enum';
import { SelectHomeComponent } from './select-home/select-home.component';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectCountriesComponent } from './select-countries/select-countries.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  pageComponent: any;
  private screenSubscription: Subscription;
  private pageComponentsDict: _.Dictionary<any> = {
    [Pages.home]: SelectHomeComponent,
    [Pages.type]: SelectTypeComponent,
    [Pages.quantity]: SelectQuantityComponent,
    [Pages.countries]: SelectCountriesComponent
  };

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.screenSubscription = this.selectService.screenChanged.subscribe(
      (screen) => this.pageComponent = this.pageComponentsDict[screen]
    );
  }

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }
}
