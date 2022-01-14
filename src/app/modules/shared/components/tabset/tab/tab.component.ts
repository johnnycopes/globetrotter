import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { fadeInAnimation } from '@utility/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class TabComponent {
  @Input() name: string;
  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    if (this._selected !== value) {
      this.changeDetectorRef.markForCheck();
    }
    this._selected = value;
  }
  private _selected: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
}
