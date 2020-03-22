import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[appLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input() selected: boolean;
}
