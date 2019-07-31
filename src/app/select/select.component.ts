import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { SelectService } from '../core/select/select.service';
import { UtilityService } from '../core/utility/utility.service';
import { Animations } from 'src/app/model/animations.enum';
import { FixedSlideablePanelPosition } from '../shared/fixed-slideable-panel/fixed-slideable-panel.component';
import { TabsetContentVisibility } from '../shared/tabset/tabset.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  tabsetControlsPosition: FixedSlideablePanelPosition = 'header';
  tabsetContentVisibility: TabsetContentVisibility = 'visible';
  canStartQuiz$: Observable<boolean>;

  constructor(
    private selectService: SelectService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.canStartQuiz$ = this.selectService.getSelection().pipe(
      map(selection => selection.canStartQuiz),
      distinctUntilChanged()
    );
  }

  async onLaunch(): Promise<void> {
    this.tabsetContentVisibility = 'invisible';
    await this.utilityService.wait(Animations.fixedSlideablePanel);
    this.tabsetControlsPosition = 'offscreen';
    await this.utilityService.wait(Animations.fixedSlideablePanel);
    this.router.navigate(['quiz']);
  }
}
