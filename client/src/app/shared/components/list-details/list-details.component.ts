import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailsComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() heightOffset: string = '96px';
  @Input() listClass: string;
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() getItemUniqueId: (item: T) => string;
  @Input() selectedItem: T;
  @Output() selectedItemChange = new EventEmitter<T>();
  public containerHeight: string;
  public listHeight: string;

  public trackByFn = (index: number, item: T): string => {
    return this.getItemUniqueId(item);
  }

  ngOnInit(): void {
    if (!this.getItemUniqueId) {
      throw new Error('A unique key function must defined as an input of the list-details component');
    }
    this.containerHeight = `calc(100vh - 12px - ${this.heightOffset})`;
    this.listHeight = `calc(100vh - 24px - ${this.heightOffset})`;
  }

  public onSelect(item: T): void {
    this.selectedItemChange.emit(item);
  }

  public checkIfSelected(item: T): boolean {
    return this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem);
  }
}
