import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  count: number = 1;
  myText: string = "My Text";

  constructor() { }

  ngOnInit() {
  }

  onCalculated(value: any): void {
    console.log("parent onCalculated", value);
    this.count = value;
  }

}
