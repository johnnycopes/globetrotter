import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EQuizType } from '@models/quiz-type.enum';
import { IRadioButtonsOption } from '@shared/components/radio-buttons/radio-buttons.component';
import { SelectService } from '@services/select/select.service';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTypeComponent implements OnInit {
  types: IRadioButtonsOption<EQuizType>[] = [];
  selectedType$: Observable<IRadioButtonsOption<EQuizType>>;
  private quizTypes: Record<EQuizType, string[]> = {
    [EQuizType.flagsCountries]: ["Flags", "Countries"],
    [EQuizType.capitalsCountries]: ["Capitals", "Countries"],
    [EQuizType.countriesCapitals]: ["Countries", "Capitals"],
  };

  constructor(private selectService: SelectService) { }

  ngOnInit(): void {
    this.types = Object
      .keys(this.quizTypes)
      .map(quizType => {
        const type = quizType as EQuizType;
        return {
          display: this.formatDisplayText(type),
          value: type
        };
      });
    this.selectedType$ = this.selectService.selection
      .observe(lens => lens.to('type'))
      .pipe(
        map(quizType => {
          const selectedType = {
            display: this.formatDisplayText(quizType),
            value: quizType
          };
          return selectedType;
        })
      );
  }

  onChange(selectedType: IRadioButtonsOption<EQuizType>): void {
    this.selectService.updateType(selectedType.value);
  }

  private formatDisplayText(quizType: EQuizType): string {
    const [ firstWord, secondWord ] = this.quizTypes[quizType];
    return `${firstWord} / ${secondWord}`;
  }
}
