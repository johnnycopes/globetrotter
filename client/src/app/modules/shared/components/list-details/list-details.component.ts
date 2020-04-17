import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, ViewChildren, QueryList } from '@angular/core';
import { InputComponent } from '../input/input.component';

export interface IListDetailsStyles {
  offsetTop: string;
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
    offsetTop: '0px',
    gap: '12px'
  };
  @Input() getItemUniqueId: (item: T) => string;
  @Input() selectedItem: T;
  @Input() searchTerm: string;
  @Input() placeholderText: string = "";
  @Output() selectedItemChange = new EventEmitter<T>();
  @Output() searchTermChange = new EventEmitter<string>();
  public containerHeight: string;
  public toolbarHeight: string;
  public trackByFn = (index: number, item: T): string => {
    return this.getItemUniqueId(item);
  }
  public gap: string = '12px';
  private selectedItemIndex: number;
  private listItemHeight: number;
  @ViewChild(InputComponent, { read: ElementRef }) private search: ElementRef;
  @ViewChild('list') private list: ElementRef;
  @ViewChild('listItem') private listItem: ElementRef;

  @HostListener('window:keydown.arrowUp', ['$event'])
  onArrowUp(event: KeyboardEvent): void {
    event.preventDefault();
    this.moveUpList(1);
  }

  @HostListener('window:keydown.shift.arrowUp', ['$event'])
  onShiftArrowUp(event: KeyboardEvent): void {
    event.preventDefault();
    this.moveUpList(10);
  }

  @HostListener('window:keydown.arrowDown', ['$event'])
  onArrowDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.moveDownList(1);
  }

  @HostListener('window:keydown.shift.arrowDown', ['$event'])
  onShiftArrowDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.moveDownList(10);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.getItemUniqueId) {
      throw new Error('A unique key function must defined as an input of the list-details component');
    }
    this.selectedItemIndex = this.items.indexOf(this.selectedItem);
  }

  ngAfterViewInit(): void {
    this.containerHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.gap} - ${this.styles.offsetTop})`;
    this.toolbarHeight = `
      calc(100vh -
      ${this.search.nativeElement.offsetHeight}px -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.offsetTop})
    `;
    this.listItemHeight = this.listItem.nativeElement.offsetHeight + parseInt(this.gap);
    this.changeDetectorRef.detectChanges();
  }

  onSelect(item: T, index: number): void {
    this.selectedItemChange.emit(item);
    this.selectedItemIndex = index;
    this.list.nativeElement.scrollTop = this.selectedItemIndex * this.listItemHeight;
  }

  checkIfSelected(item: T): boolean {
    return this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem);
  }

  private moveUpList(incrementValue: number): void {
    const newItemIndex = this.selectedItemIndex - incrementValue;
    if (newItemIndex >= 0) {
      this.onSelect(this.items[newItemIndex], newItemIndex);
    }
  }

  private moveDownList(incrementValue: number): void {
    const newItemIndex = this.selectedItemIndex + incrementValue;
    if (newItemIndex < this.items.length) {
      this.onSelect(this.items[newItemIndex], newItemIndex);
    }
  }
}
