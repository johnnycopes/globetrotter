import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { SelectService } from 'src/app/core/select/select.service';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {
  types: RadioButtonsOption<QuizTypes>[];
  selectedType$: Observable<RadioButtonsOption<QuizTypes>>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.types = _.map(QuizTypes, quizType => {
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

  onChange(selectedType: RadioButtonsOption<QuizTypes>): void {
    this.selectService.updateType(selectedType.value);
  }

  private formatDisplayText(text: QuizTypes): string {
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
