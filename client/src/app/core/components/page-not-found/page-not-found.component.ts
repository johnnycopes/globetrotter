import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from 'src/app/shared/model/route-names.enum';
import { fadeInAnimation } from 'src/app/shared/utility/animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  animations: [fadeInAnimation]
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  onHomeClick(): void {
    this.router.navigate([RouteNames.home]);
  }
}
