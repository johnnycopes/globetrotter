import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from '@models/route-names.enum';

interface NavigationLink {
  name: string;
  route: string;
  icon?: string;
  exactPathMatch: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  home: NavigationLink;
  links: NavigationLink[];
  account: NavigationLink;

  constructor(private router: Router) { }

  ngOnInit() {
    this.home = {
      name: 'Home',
      icon: 'Globetrotter',
      route: RouteNames.home,
      exactPathMatch: true
    };
    this.links = [
      {
        name: 'Explore',
        route: RouteNames.explore,
        exactPathMatch: true
      },
      {
        name: 'Prepare',
        route: RouteNames.prepare,
        exactPathMatch: true
      },
      {
        name: 'Learn',
        route: RouteNames.learn,
        exactPathMatch: false
      }
    ];
    this.account = {
      name: 'Account',
      icon: 'User',
      route: RouteNames.account,
      exactPathMatch: false
    };
  }
}
