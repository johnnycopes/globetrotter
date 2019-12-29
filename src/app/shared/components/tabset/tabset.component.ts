import { Component, AfterContentInit, ContentChildren, QueryList, Input, TemplateRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';

import { TabComponent } from './tab/tab.component';
import { Animation } from 'src/app/shared/model/animation.enum';

export type TabsetContentVisibility = 'visible' | 'invisible';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
  animations: [
    trigger('visibility', [
      state('invisible', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('* => *', animate(`${Animation.screenTransition}ms ease-in-out`))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animation.screenTransition}ms ${Animation.fixedSlideablePanel}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class TabsetComponent implements AfterContentInit {
  @Input() controlsTemplate: TemplateRef<any>;
  @Input() contentVisibility: TabsetContentVisibility = 'invisible';
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);

    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }
  }

  onSelectTab(tab: TabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }
}
