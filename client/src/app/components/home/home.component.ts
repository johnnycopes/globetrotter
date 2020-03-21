import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from '@models/route-names.enum';
import { fadeInAnimation } from '@utility/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation]
})
export class HomeComponent {

  constructor(private router: Router) { }

  onClick(): void {
    this.router.navigate([RouteNames.learn]);
  }
}
