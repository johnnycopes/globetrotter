import { EQuizType } from './quiz-type.enum';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';

export class Selection {
  type: EQuizType = EQuizType.flagsCountries;
  quantity: number = 5;
  countries: TCheckboxStates = {};
}
