import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { fadeInAnimation } from 'src/app/shared/utility/animations';

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
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (this._selected !== value) {
      this.changeDetectorRef.markForCheck();
    }
    this._selected = value;
  }
  private _selected: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }
}
