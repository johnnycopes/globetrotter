import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from 'src/app/shared/model/route-names.enum';

interface NavigationLink {
  name?: string;
  icon?: string;
  route: string;
  exactPathMatch: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  links: NavigationLink[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.links = [
      {
        name: 'Explore',
        route: 'explore',
        exactPathMatch: true
      },
      {
        name: 'Prepare',
        route: 'prepare',
        exactPathMatch: true
      },
      {
        name: 'Learn',
        route: 'learn',
        exactPathMatch: false
      }
    ];
  }

  navigateToHome(): void {
    this.router.navigate([RouteNames.home]);
  }

  navigateToAccount(): void {
    this.router.navigate([RouteNames.account]);
  }

}
