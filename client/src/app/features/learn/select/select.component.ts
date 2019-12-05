import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { SelectService } from 'src/app/core/services/select/select.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { Selection } from 'src/app/shared/model/selection.class';
import { Animation } from 'src/app/shared/model/animation.enum';
import { FixedSlideablePanelPosition } from 'src/app/shared/components/fixed-slideable-panel/fixed-slideable-panel.component';
import { TabsetContentVisibility } from 'src/app/shared/components/tabset/tabset.component';

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
    await this.utilityService.wait(Animation.fixedSlideablePanel);
    this.tabsetControlsPosition = 'offscreen';
    await this.utilityService.wait(Animation.fixedSlideablePanel);
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
