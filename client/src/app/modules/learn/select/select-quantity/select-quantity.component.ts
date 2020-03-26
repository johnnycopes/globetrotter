import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import * as _ from 'lodash';
;
import { SelectService } from '@services/select/select.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectQuantityComponent {
  @Input() quantity: number
  @Input() invalid: boolean = false;

  constructor(private selectService: SelectService) { }

  onChange(quantity: number): void {
    this.selectService.updateQuantity(quantity);
  }
}
