import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

import { SelectService, Selection } from './select.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class SelectComponent implements OnInit, OnDestroy {
  @Output() selectionMade = new EventEmitter<Selection>();
  screen = 'quantity';
  screenSubscription: Subscription;
  selection: Selection;
  selectionSubscription: Subscription;

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.screenSubscription = this.selectService.screenChanged.subscribe(
      (screen) => {
        if (screen !== 'quiz') {
          this.screen = screen;
        }
        else if (screen === 'quiz') {
          this.selectionMade.emit(this.selection);
        }
      }
    );
    this.selectionSubscription = this.selectService.selectionChanged.subscribe(
      (selection) => this.selection = selection
    );
  }

  ngOnDestroy() {
    this.screenSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }
}
