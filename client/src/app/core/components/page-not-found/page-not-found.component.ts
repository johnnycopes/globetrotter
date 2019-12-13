import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from 'src/app/shared/model/route-names.enum';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  onHomeClick(): void {
    this.router.navigate([RouteNames.home]);
  }
}
