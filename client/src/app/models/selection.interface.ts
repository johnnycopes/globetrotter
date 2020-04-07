import { EQuizType } from './quiz-type.enum';
import { TCheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';

export interface ISelection {
  type: EQuizType;
  quantity: number;
  countries: TCheckboxStates;
}
