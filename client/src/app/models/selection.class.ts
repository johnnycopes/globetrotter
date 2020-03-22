import { EQuizType } from './quiz-type.enum';
import { TQuizQuantity } from './quiz-quantity.type';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';

export class Selection {
  type: EQuizType = EQuizType.flagsCountries;
  quantity: TQuizQuantity = 5;
  countries: TCheckboxStates = {};
}
