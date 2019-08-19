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
      icon: 'Africa',
      route: 'explore',
    },
    {
      name: 'Prepare',
      icon: 'Asia',
      route: 'prepare',
    },
    {
      name: 'Quiz',
      icon: 'Americas',
      route: 'select',
    },
    {
      name: 'Account',
      icon: 'Earth',
      route: 'account',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
