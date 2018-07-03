import { Component, OnInit, Input } from '@angular/core';
import { Quantity, QuantityModel } from '../select.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
  @Input() model: QuantityModel;
  @Input() quantities: Quantity[];

  constructor() { }

  ngOnInit() {
  }

}
