import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailsComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() selectedItem: T;
  @Input() uniqueKey: string;
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() detailsTemplate: TemplateRef<any>;
  @Output() itemSelected = new EventEmitter<T>();
  private itemsKeyedByUniqueKey: _.Dictionary<T>;

  ngOnInit(): void {
    if (!this.uniqueKey) {
      throw new Error('A unique key must defined as an input of the list-details component');
    }
    this.itemsKeyedByUniqueKey = _.keyBy(this.items, this.uniqueKey);
  }

  public trackByFn(index: number, item: T): number {
    return item[this.uniqueKey];
  }

  public onSelect(item: T): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  public checkIfSelected(item: T): boolean {
    return item[this.uniqueKey] === this.selectedItem[this.uniqueKey];
  }
}
