import { EQuizType } from '../enums/quiz-type.enum';
import { CheckboxStates } from '@shared/components/nested-checkboxes/nested-checkboxes.component';

export interface ISelection {
  type: EQuizType;
  quantity: number;
  countries: CheckboxStates;
}

export interface ISelectionParams {
  type: string;
  quantity: string;
  countries: string;
}
