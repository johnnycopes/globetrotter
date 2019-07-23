import { Component } from '@angular/core';
import * as _ from 'lodash';

import { PageService } from '../core/page/page.service';
import { FixedSlideablePanelPosition } from '../shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { UtilityService } from '../core/utility/utility.service';
import { Animations } from 'src/app/model/animations.enum';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  position: FixedSlideablePanelPosition = 'header';

  constructor(
    private pageService: PageService,
    private utilityService: UtilityService
  ) { }

  async onLaunch(): Promise<void> {
    this.position = 'offscreen';
    await this.utilityService.wait(Animations.fixedSlideablePanel);
    this.pageService.nextPage();
  }
}
