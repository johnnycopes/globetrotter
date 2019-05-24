import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

import { SelectService, Selection } from './select.service';
import { Pages } from '../model/pages.enum';
import { Animations } from '../model/animations.enum';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate(`${Animations.selectFadeIn}ms ease-in`, style({ opacity: '1' }))
      ])
    ])
  ]
})
export class SelectComponent implements OnInit, OnDestroy {
  Pages: typeof Pages = Pages;
  screen: string;
  selection: Selection;
  private screenSubscription: Subscription;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.screenSubscription = this.selectService.screenChanged.subscribe(
      (screen) => this.screen = screen
    );
  }

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }
}
