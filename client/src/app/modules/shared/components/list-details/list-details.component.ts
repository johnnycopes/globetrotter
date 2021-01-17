import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, TemplateRef, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
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
export class ListDetailsComponent<T> implements OnInit, OnChanges, AfterViewInit {
  @Input() items: T[];
  @Input() listItemTemplate: TemplateRef<unknown>;
  @Input() detailsTemplate: TemplateRef<unknown>;
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
  @ViewChild(InputComponent, { read: ElementRef }) private search: ElementRef<HTMLInputElement>;
  @ViewChild('list') private list: ElementRef<HTMLElement>;
  @ViewChild('listItem') private listItem: ElementRef<HTMLElement>;
  public gap: string = '12px';
  public containerHeight: string;
  public toolbarHeight: string;
  private selectedItemIndex: number;
  private listItemHeight: number;

  public trackByFn = (index: number, item: T): string => {
    return this.getItemUniqueId(item);
  }

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
      throw new Error('Missing input(s): getItemUniqueId must be passed to the list-details component');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.selectedItem || changes?.items) {
      this.selectedItemIndex = this.items.indexOf(this.selectedItem);
      if (this.selectedItemIndex >= 0 && this.list) {
        setTimeout(() => {
          const list = this.list?.nativeElement;
          if (list) {
            list.scrollTop = this.selectedItemIndex * this.listItemHeight
          }
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.containerHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.gap} - ${this.styles.offsetTop})`;
    this.toolbarHeight = `
      calc(100vh -
      ${this.search?.nativeElement?.offsetHeight ?? 0}px -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.offsetTop})
    `;
    this.listItemHeight = this.listItem.nativeElement.offsetHeight + parseInt(this.gap);
    this.changeDetectorRef.detectChanges();
  }

  onSearch(searchTerm: string): void {
    this.searchTermChange.emit(searchTerm);
  }

  onSelect(item: T): void {
    this.selectedItemChange.emit(item);
  }

  checkIfSelected(item: T): boolean {
    return this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem);
  }

  private moveUpList(incrementValue: number): void {
    const newItemIndex = this.selectedItemIndex - incrementValue;
    if (newItemIndex >= 0) {
      this.onSelect(this.items[newItemIndex]);
    }
  }

  private moveDownList(incrementValue: number): void {
    const newItemIndex = this.selectedItemIndex + incrementValue;
    if (newItemIndex < this.items.length) {
      this.onSelect(this.items[newItemIndex]);
    }
  }
}
