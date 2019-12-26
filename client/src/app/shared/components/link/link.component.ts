import { Component, Input } from '@angular/core';

@Component({
  selector: '[appLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() selected: boolean;
}
