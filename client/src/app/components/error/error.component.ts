import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fadeInAnimation } from '@utility/animations';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class ErrorComponent { }
