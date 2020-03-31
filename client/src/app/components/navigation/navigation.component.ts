import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ERoute } from '@models/route.enum';
import { positionAnimation } from '@utility/animations';
import { AnimatedComponent } from '@models/animated-component.class';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation]
})
export class NavigationComponent extends AnimatedComponent implements OnInit {
  position = "navigation"
  home: INavigationLink;
  links: INavigationLink[];

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
      // {
      //   name: 'Prepare',
      //   route: ERoute.prepare,
      //   exactPathMatch: true
      // },
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
