import { Component, Input } from '@angular/core';

import { fadeInAnimation } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [fadeInAnimation]
})
export class TabComponent {
  @Input() name: string;
  @Input() selected: boolean;

  constructor() { }

}
