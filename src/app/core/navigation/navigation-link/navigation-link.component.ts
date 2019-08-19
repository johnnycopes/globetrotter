import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss']
})
export class NavigationLinkComponent {
  @Input() name: string;
  @Input() icon: string;
  @Input() route: string;
  @Input() iconPath: string;

  constructor() { }

}
