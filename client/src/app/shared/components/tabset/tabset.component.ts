import { Component, AfterContentInit, ContentChildren, QueryList, Input, TemplateRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { visibilityAnimation, fadeInWithFixedSlideablePanelDelayAnimation } from '../../utility/animations';
import { TabComponent } from './tab/tab.component';

export type TabsetContentVisibility = 'visible' | 'invisible';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    visibilityAnimation,
    fadeInWithFixedSlideablePanelDelayAnimation
  ]
})
export class TabsetComponent implements AfterContentInit {
  @Input() controlsTemplate: TemplateRef<any>;
  @Input() contentVisibility: TabsetContentVisibility = 'visible';
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() animationStarted = new EventEmitter<AnimationEvent>();
  @Output() animationFinished = new EventEmitter<AnimationEvent>();

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

  onAnimationStart(event: AnimationEvent): void {
    this.animationStarted.emit(event);
  }

  onAnimationFinish(event: AnimationEvent): void {
    this.animationFinished.emit(event);
  }
}
