import { Component } from '@angular/core';
import * as _ from 'lodash';

import { PageService } from '../core/page/page.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  constructor(private pageService: PageService) { }

  onLaunch(): void {
    this.pageService.nextPage();
  }
}
