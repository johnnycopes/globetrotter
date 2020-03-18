import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { SelectService } from 'src/app/core/services/select/select.service';
import { EQuizType } from 'src/app/shared/model/quiz-type.enum';
import { RadioButtonsOption } from 'src/app/shared/components/radio-buttons/radio-buttons.component';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTypeComponent implements OnInit {
  types: RadioButtonsOption<EQuizType>[];
  selectedType$: Observable<RadioButtonsOption<EQuizType>>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.types = _.map(EQuizType, quizType => {
      const type = {
        display: this.formatDisplayText(quizType),
        value: quizType
      };
      return type;
    });
    this.selectedType$ = this.selectService.getSelection().pipe(
      map(selection => {
        const quizType = selection.type;
        const selectedType = {
          display: this.formatDisplayText(quizType),
          value: quizType
        };
        return selectedType;
      })
    );
  }

  onChange(selectedType: RadioButtonsOption<EQuizType>): void {
    this.selectService.updateType(selectedType.value);
  }

  private formatDisplayText(text: EQuizType): string {
    const textAsArray = _
      .chain(text)
      .toLower()
      .startCase()
      .split(' ')
      .value()
    const [ firstWord, secondWord ] = textAsArray;
    return `${firstWord} → ${secondWord}`;
  }
}
