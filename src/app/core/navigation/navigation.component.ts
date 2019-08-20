import { Component, OnInit } from '@angular/core';

interface NavigationLink {
  name: string;
  icon: string;
  route: string;
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
    },
    {
      name: 'Explore',
      icon: 'Airplane',
      route: 'explore',
    },
    {
      name: 'Prepare',
      icon: 'Luggage',
      route: 'prepare',
    },
    {
      name: 'Learn',
      icon: 'Lightbulb',
      route: 'select',
    },
    {
      name: 'Account',
      icon: 'User',
      route: 'account',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
