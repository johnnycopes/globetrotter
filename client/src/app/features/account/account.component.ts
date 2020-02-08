import { Component } from '@angular/core';

import { fadeInAnimation } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent {

  constructor() { }

}
