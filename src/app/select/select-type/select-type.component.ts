import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { SelectService } from '../select.service';
import { QuizTypes } from 'src/app/model/quiz-types.enum';
import { RadioButtonsOption } from 'src/app/shared/radio-buttons/radio-buttons.component';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {
  public types: RadioButtonsOption<QuizTypes>[];
  public selectedType: RadioButtonsOption<QuizTypes>;

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.types = _.map(QuizTypes, (quizType) => {
      return {
        display: quizType,
        value: quizType
      };
    });
    this.selectedType = _.clone(this.types[0]);
  }

  onClick(): void {
    this.selectService.updateType(this.selectedType.value);
    this.selectService.nextScreen();
  }
}
