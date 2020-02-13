import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

export interface ListDetailsStyles {
  heightOffset: string;
  gap: string;
}

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailsComponent<T> implements OnInit {
  @Input() items: T[];
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() styles: ListDetailsStyles;
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
    this.containerHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.heightOffset})`;
    this.listHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.gap} - ${this.styles.heightOffset})`;
  }

  public onSelect(item: T): void {
    this.selectedItemChange.emit(item);
  }

  public checkIfSelected(item: T): boolean {
    return this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem);
  }
}
