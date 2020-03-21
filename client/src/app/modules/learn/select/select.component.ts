import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { RouteNames } from '@models/route-names.enum';
import { Selection } from '@models/selection.class';
import { EAnimationDuration } from '@models/animation-duration.enum';
import { SelectService } from '@services/select/select.service';
import { UtilityService } from '@services/utility/utility.service';
import { FixedSlideablePanelPosition } from '@shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { TabsetContentVisibility } from '@shared/components/tabset/tabset.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  tabsetControlsPosition: FixedSlideablePanelPosition = 'header';
  tabsetContentVisibility: TabsetContentVisibility = 'visible';
  canStartQuiz: boolean;
  private queryParams: _.Dictionary<string>;
  private selection: Selection;
  private selectionSubscription: Subscription;

  constructor(
    private selectService: SelectService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectionSubscription = this.selectService.getSelection().subscribe(
      selection => {
        this.selection = selection;
        this.canStartQuiz = _.some(this.selection.countries, checkboxState => checkboxState === 'checked');
      }
    );
  }

  ngOnDestroy(): void {
    this.selectionSubscription.unsubscribe();
  }

  async onLaunch(): Promise<void> {
    this.tabsetContentVisibility = 'invisible';
    await this.utilityService.wait(EAnimationDuration.fixedSlideablePanel);
    this.tabsetControlsPosition = 'offscreen';
    await this.utilityService.wait(EAnimationDuration.fixedSlideablePanel);
    this.queryParams = this.selectService.mapSelectionToQueryParams(this.selection);
    this.router.navigate(
      [`${RouteNames.learn}/${RouteNames.quiz}`],
      { queryParams: this.queryParams }
    );
  }

  onQuit(): void {
    this.router.navigate([RouteNames.home]);
  }
}