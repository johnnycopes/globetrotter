import { Component, OnInit } from '@angular/core';

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
  home: NavigationLink;
  account: NavigationLink;
  links: NavigationLink[];

  constructor() { }

  ngOnInit() {
    this.home = {
      icon: 'Globetrotter',
      route: '/',
      exactPathMatch: true
    };
    this.account = {
      icon: 'User',
      route: 'account',
      exactPathMatch: false
    };
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

}
