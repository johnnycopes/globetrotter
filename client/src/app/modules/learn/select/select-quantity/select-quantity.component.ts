import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
;
import { SelectService } from '@services//select/select.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuantityComponent implements OnInit {
  quantity$: Observable<number>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.quantity$ = this.selectService.getSelection().pipe(
      map(selection => selection.quantity)
    );
  }

  onChange(quantity: number): void {
    this.selectService.updateQuantity(quantity);
  }
}
