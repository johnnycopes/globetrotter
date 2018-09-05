import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() text: string;
  @Output() calculated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private parent: ParentComponent) { }

  ngOnInit() {
    this.calculate();
    this.parent.count = 10;
  }

  calculate(): void {
    const result = 1 + 1;
    // this.calculated.emit(result);
  }

}
