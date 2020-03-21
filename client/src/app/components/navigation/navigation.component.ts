import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ERoute } from '@models/route.enum';

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
      route: ERoute.home,
      exactPathMatch: true
    };
    this.links = [
      {
        name: 'Explore',
        route: ERoute.explore,
        exactPathMatch: true
      },
      {
        name: 'Prepare',
        route: ERoute.prepare,
        exactPathMatch: true
      },
      {
        name: 'Learn',
        route: ERoute.learn,
        exactPathMatch: false
      }
    ];
    this.account = {
      name: 'Account',
      icon: 'User',
      route: ERoute.account,
      exactPathMatch: false
    };
  }
}
