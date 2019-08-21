import { Component, OnInit } from '@angular/core';

interface NavigationLink {
  name: string;
  icon: string;
  route: string;
  exactPathMatch: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  links: NavigationLink[] = [
    {
      name: 'Home',
      icon: 'Globetrotter',
      route: '/',
      exactPathMatch: true
    },
    {
      name: 'Explore',
      icon: 'Airplane',
      route: 'explore',
      exactPathMatch: true
    },
    {
      name: 'Prepare',
      icon: 'Luggage',
      route: 'prepare',
      exactPathMatch: true
    },
    {
      name: 'Learn',
      icon: 'Lightbulb',
      route: 'learn',
      exactPathMatch: false
    },
    {
      name: 'Account',
      icon: 'User',
      route: 'account',
      exactPathMatch: true
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
