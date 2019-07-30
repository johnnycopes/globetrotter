import { Component, AfterContentInit, ContentChildren, QueryList, Input, TemplateRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition
} from '@angular/animations';

import { TabComponent } from '../tab/tab.component';
import { FixedSlideablePanelPosition } from '../fixed-slideable-panel/fixed-slideable-panel.component';
import { Animations } from 'src/app/model/animations.enum';

export type TabsVisibility = 'visible' | 'invisible';

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
      transition('* => *', animate(`${Animations.screenTransition}ms ease-in-out`))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animations.screenTransition}ms ${Animations.fixedSlideablePanel}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class TabsetComponent implements AfterContentInit {
  @Input() controlsPosition: FixedSlideablePanelPosition = 'header';
  @Input() tabsVisibility: TabsVisibility = 'invisible';
  @Input() tabsTemplate: TemplateRef<any>;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.tabsTemplate);
  }

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
