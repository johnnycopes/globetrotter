import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
;
import { SelectService } from 'src/app/core/services/select/select.service';
import { RadioButtonsOption } from 'src/app/shared/components/radio-buttons/radio-buttons.component';
import { TQuizQuantity } from 'src/app/shared/model/quiz-quantity.type';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {
  quantities: RadioButtonsOption<TQuizQuantity>[];
  selectedQuantity$: Observable<RadioButtonsOption<TQuizQuantity>>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.quantities = [
      { display: '5', value: 5 },
      { display: '10', value: 10 },
      { display: '15', value: 15 },
      { display: '20', value: 20 },
      { display: 'All', value: null }
    ];
    this.selectedQuantity$ = this.selectService.getSelection().pipe(
      map(selection => {
        const quizQuantity = selection.quantity;
        const selectedQuantity = {
          display: _.toString(quizQuantity),
          value: quizQuantity
        };
        return selectedQuantity;
      })
    );
  }

  onChange(selectedQuantity: RadioButtonsOption<TQuizQuantity>): void {
    this.selectService.updateQuantity(selectedQuantity.value);
  }
}
