import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { FixedSlideablePanelPosition } from '../shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { UtilityService } from '../core/utility/utility.service';
import { Animations } from 'src/app/model/animations.enum';
import { TabsVisibility } from '../shared/tabset/tabset.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  controlsPosition: FixedSlideablePanelPosition = 'header';
  tabsVisibility: TabsVisibility = 'visible';

  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }

  async onLaunch(): Promise<void> {
    this.tabsVisibility = 'invisible';
    await this.utilityService.wait(Animations.fixedSlideablePanel);
    this.controlsPosition = 'offscreen';
    await this.utilityService.wait(Animations.fixedSlideablePanel);
    this.router.navigate(['quiz']);
  }
}
