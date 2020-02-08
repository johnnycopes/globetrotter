import { Component } from '@angular/core';

import { fadeInAnimation } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [fadeInAnimation]
})
export class ErrorComponent {

}
