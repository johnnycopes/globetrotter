import { Component, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';

import { TabComponent } from '../tab/tab.component';
import { FixedSlideablePanelPosition } from '../fixed-slideable-panel/fixed-slideable-panel.component';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements AfterContentInit {
  @Input() position: FixedSlideablePanelPosition = 'header';
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);

    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }
}
