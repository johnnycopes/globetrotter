import { Component, OnInit } from '@angular/core';

import { ERoute } from '@models/route.enum';
import { positionAnimation } from '@utility/animations';

interface INavigationLink {
  name: string;
  route: string;
  icon?: string;
  exactPathMatch: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [positionAnimation]
})
export class NavigationComponent implements OnInit {
  position = "navigation"
  home: INavigationLink;
  links: INavigationLink[];

  constructor() { }

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
      },
      {
        name: 'Account',
        route: ERoute.account,
        exactPathMatch: false
      }
    ];
  }
}
