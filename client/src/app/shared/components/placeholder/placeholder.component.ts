import { Component } from '@angular/core';

import { fadeInAnimation } from '../../utility/animations';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  animations: [fadeInAnimation]
})
export class PlaceholderComponent {

  constructor() { }

}
