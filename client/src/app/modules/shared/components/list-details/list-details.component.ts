import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { InputComponent } from '../input/input.component';

export interface IListDetailsStyles {
  heightOffset: string;
  gap: string;
}

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailsComponent<T> implements OnInit, AfterViewInit {
  @Input() items: T[];
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() detailsTemplate: TemplateRef<any>;
  @Input() styles: IListDetailsStyles = {
    heightOffset: '0px',
    gap: '12px'
  };
  @Input() getItemUniqueId: (item: T) => string;
  @Input() selectedItem: T;
  @Input() searchTerm: string;
  @Output() selectedItemChange = new EventEmitter<T>();
  @Output() searchTermChange = new EventEmitter<string>();
  public containerHeight: string;
  public toolbarHeight: string;
  public trackByFn = (index: number, item: T): string => {
    return this.getItemUniqueId(item);
  }
  @ViewChild(InputComponent, { read: ElementRef }) private search: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.getItemUniqueId) {
      throw new Error('A unique key function must defined as an input of the list-details component');
    }
  }

  ngAfterViewInit(): void {
    this.containerHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.heightOffset})`;
    this.toolbarHeight = `
      calc(100vh -
      ${this.search.nativeElement.offsetHeight}px -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.heightOffset})
    `;
    this.cdRef.detectChanges();
  }

  public onSelect(item: T): void {
    this.selectedItemChange.emit(item);
  }

  public checkIfSelected(item: T): boolean {
    return this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem);
  }
}
