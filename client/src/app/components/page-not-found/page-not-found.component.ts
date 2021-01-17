import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ERoute } from '@models/route.enum';
import { fadeInAnimation } from '@utility/animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  async onHomeClick(): Promise<void> {
    await this.router.navigate([ERoute.home]);
  }
}
